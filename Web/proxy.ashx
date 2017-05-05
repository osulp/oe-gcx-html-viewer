<%@ WebHandler Language="C#" Class="proxy" %>
/*
  This proxy page does not have any security checks. It is highly recommended
  that a user deploying this proxy page on their web server, add appropriate
  security checks, for example checking request path, username/password, target
  url, etc.
 
  This class has also been ported to the Geocortex App Framework, so fixes here should be ported.
*/
using System;
using System.Drawing;
using System.IO;
using System.Web;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Net;
using System.Text;
using System.Xml.Serialization;
using System.Web.Caching;

/// <summary>
/// Forwards requests to an ArcGIS Server REST resource. Uses information in
/// the proxy.config file to determine properties of the server.
/// </summary>
public class proxy : IHttpHandler {

    public void ProcessRequest (HttpContext context) {

        HttpResponse response = context.Response;

        // Are we dealing with a JSONP request? If so, we can forward the actual response and handle the JSONP part ourself.
        string callbackName = context.Request.QueryString["callback"];

        ServerUrl serverConfig = null;
        string uri = null;
        string token = context.Request.QueryString["token"];

        if (token == null && context.Request.Form["token"] != null)
        {
            token = context.Request.Form["token"];
        }
        
        if (callbackName != null)
        {
            //context.Request.QueryString.Remove("callback");
            System.Collections.Specialized.NameValueCollection newQueryString = HttpUtility.ParseQueryString(context.Request.QueryString.ToString());
            newQueryString.Remove("callback");

            // Remove the token temporarily so it doesn't get unescaped.
            if (token != null)
            {
                newQueryString.Remove("token");
            }

            uri = Uri.UnescapeDataString(newQueryString.ToString());
        }
        else
        {
            // Get the URL requested by the client (take the entire querystring at once
            //  to handle the case of the URL itself containing querystring parameters)
            uri = Uri.UnescapeDataString(context.Request.QueryString.ToString());
        }

        // Make sure we have well formed URL parameters.
        // i.e. If we have a query string that begins with & instead of ?, then fix it up
        int indexOfFirstAmp = uri.IndexOf("&");
        if (indexOfFirstAmp > -1 && uri.IndexOf("?") < 0)
        {
            StringBuilder sb = new StringBuilder(uri);
            sb[indexOfFirstAmp] = '?';
            uri = sb.ToString();
        }

        // The Server config will tell us both the token, and whether we should send the users credentials to the remote server
        // The default server config might be returned if mustMatch is false
        serverConfig = getServerConfigFromConfigFile(uri);
        
        // Get configured token, if applicable and no other token present, and append to the request
        if (token == null)
        {
            token = serverConfig.Token;

            // Add token, if present.
            if (!String.IsNullOrEmpty(token))
            {
                if (uri.Contains("?"))
                {
                    uri += "&token=" + Uri.EscapeDataString(token);
                }
                else
                {
                    uri += "?token=" + Uri.EscapeDataString(token);
                }
            }
        }


        System.Net.HttpWebRequest req = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(uri);
        if (serverConfig.SendCredentials)
            req.Credentials = CredentialCache.DefaultCredentials;
        
        req.Method = context.Request.HttpMethod;
        req.ContentType = context.Request.ContentType;

        if (context.Request.UrlReferrer != null)
        {
            req.Referer = context.Request.UrlReferrer.ToString();
        }
        
        // Set body of request for POST requests
        if (IsWmsUrl(uri))
        {
            req.Method = "GET";
        }
        else if (context.Request.InputStream.Length > 0)
        {
            byte[] bytes = new byte[context.Request.InputStream.Length];
            context.Request.InputStream.Read(bytes, 0, (int)context.Request.InputStream.Length);
            req.ContentLength = bytes.Length;

            // Default to application/x-www-form-urlencoded if not uploading attachments.
            if (context.Request.ContentType.IndexOf("multipart/form-data") < 0)
            {
                req.ContentType = "application/x-www-form-urlencoded";
            }

            using (Stream outputStream = req.GetRequestStream())
            {
                outputStream.Write(bytes, 0, bytes.Length);
            }
        }

        // Send the request to the server
        System.Net.WebResponse serverResponse = null;
        try
        {
            serverResponse = req.GetResponse();
        }
        catch (System.Net.WebException webExc)
        {
            if (webExc.Status == WebExceptionStatus.ProtocolError)
            {
                HttpWebResponse errResponse = webExc.Response as HttpWebResponse;
                if (errResponse != null)
                {
                    response.StatusCode = ((int)errResponse.StatusCode);
                    serverResponse = errResponse;
                }
            }
            
            if (serverResponse == null)
            {
                response.StatusCode = 500;
                response.StatusDescription = webExc.Status.ToString();
                response.Write(webExc.Response);
                response.End();
                return;
            }
        }
        
        // Set up the response to the client
        if (serverResponse != null) {
            response.ContentType = serverResponse.ContentType;
            using (Stream byteStream = serverResponse.GetResponseStream())
            {

                // Text response
                if (serverResponse.ContentType.Contains("text") || serverResponse.ContentType.Contains("json") || serverResponse.ContentType.Contains("xml"))
                {
                    using (StreamReader sr = new StreamReader(byteStream))
                    {
                        string strResponse = String.Empty;
                        
                        if (callbackName != null)
                        {
                            strResponse = String.Format("{0}({1});", callbackName, sr.ReadToEnd());
                        }
                        else
                        {
                            strResponse = sr.ReadToEnd();
                        }
                        
                        response.Write(strResponse);
                    }
                }
                else
                {
                    // Binary response (image, lyr file, other binary file)
                    BinaryReader br = new BinaryReader(byteStream);

                    byte[] outb = new byte[16 * 1024]; // Arbitrary size - ContentLength here will be -1 in case of chunked transfer-encoding
                    int bytesRead;

                    // Tell client not to cache the image since it's dynamic
                    response.CacheControl = "no-cache";

                    while ((bytesRead = (int)br.Read(outb, 0, outb.Length)) > 0)
                    {
                        response.OutputStream.Write(outb, 0, bytesRead);
                    }

                    br.Close();
                }

                serverResponse.Close();
            }
        }
        response.End();
    }

    private bool IsWmsUrl(string uri)
    {
        string lowerCaseUri = uri.ToLowerInvariant();
        return lowerCaseUri.Contains("request=getcapabilities") || lowerCaseUri.Contains("request=getmap");        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    
    // Gets the server config for a server URL from a configuration file
    // TODO: ?modify so can generate a new short-lived token from username/password in the config file
    private ServerUrl getServerConfigFromConfigFile(string uri)
    {
        try
        {
            ProxyConfig config = ProxyConfig.GetCurrentConfig();
            if (config != null)
                return config.GetServerConfig(uri);
            else
                throw new ApplicationException("Proxy.config file does not exist at application root, or is not readable.");
        }
        catch (InvalidOperationException)
        {
            // Proxy is being used for an unsupported service (proxy.config has mustMatch="true")
            HttpResponse response = HttpContext.Current.Response;
            response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;
            response.End();
        }
        catch (Exception e)
        {
            if (e is ApplicationException)
                throw e;
            
            // just return the default server config at this point
            // -- may want to throw an exception, or add to a log file
        }
        
        return ServerUrl.Default;
    }
}

[XmlRoot("ProxyConfig")]
public class ProxyConfig
{
    #region Static Members

    private static object _lockobject = new object();

    public static ProxyConfig LoadProxyConfig(string fileName)
    {
        ProxyConfig config = null;

        lock (_lockobject)
        {
            if (System.IO.File.Exists(fileName))
            {
                XmlSerializer reader = new XmlSerializer(typeof(ProxyConfig));
                using (System.IO.StreamReader file = new System.IO.StreamReader(fileName))
                {
                    config = (ProxyConfig)reader.Deserialize(file);
                }
            }
        }

        return config;
    }

    public static ProxyConfig GetCurrentConfig()
    {
        ProxyConfig config = HttpRuntime.Cache["proxyConfig"] as ProxyConfig;
        if (config == null)
        {
            string fileName = GetFilename(HttpContext.Current);
            config = LoadProxyConfig(fileName);

            if (config != null)
            {
                CacheDependency dep = new CacheDependency(fileName);
                HttpRuntime.Cache.Insert("proxyConfig", config, dep);
            }
        }

        return config;
    }

    public static string GetFilename(HttpContext context)
    {
        return context.Server.MapPath("proxy.config");
    }
    #endregion

    ServerUrl[] serverUrls;
    bool mustMatch;

    [XmlArray("serverUrls")]
    [XmlArrayItem("serverUrl")]
    public ServerUrl[] ServerUrls
    {
        get { return this.serverUrls; }
        set { this.serverUrls = value; }
    }

    [XmlAttribute("mustMatch")]
    public bool MustMatch
    {
        get { return mustMatch; }
        set { mustMatch = value; }
    }

    public ServerUrl GetServerConfig(string uri)
    {
        foreach (ServerUrl su in serverUrls)
        {
            if (su.MatchAll && uri.StartsWith(su.Url, StringComparison.InvariantCultureIgnoreCase))
            {
                return su;
            }
            else
            {
                if (String.Compare(uri, su.Url, StringComparison.InvariantCultureIgnoreCase) == 0)
                    return su;
            }
        }

        if (mustMatch)
            throw new InvalidOperationException();

        return ServerUrl.Default;
    }
    
    public string GetToken(string uri)
    {
        return GetServerConfig(uri).Token;
    }
}

public class ServerUrl
{
    string url;
    bool matchAll;
    string token;
    bool sendCredentials;

    [XmlAttribute("url")]
    public string Url
    {
        get { return url; }
        set { url = value; }
    }

    [XmlAttribute("matchAll")]
    public bool MatchAll
    {
        get { return matchAll; }
        set { matchAll = value; }
    }

    [XmlAttribute("token")]
    public string Token
    {
        get { return token; }
        set { token = value; }
    }

    [XmlAttribute("sendCredentials")]
    public bool SendCredentials
    {
        get { return sendCredentials; }
        set { sendCredentials = (value != null) ? value : false; }
    }
    
    public static ServerUrl Default
    {
        get
        {
            ServerUrl config = new ServerUrl();
            config.url = string.Empty;
            config.matchAll = true;
            config.token = string.Empty;
            config.sendCredentials = false;

            return config;
        }
    }
}