<%@page session="false"%>
<%@page import="java.net.*,java.io.*,java.util.regex.*" %>
<%!   
	// Servers to allow proxy access to
	String[] serverUrls = {
		//"<url>[,<token>]"
		//For ex. (secured server): "http://myserver.mycompany.com/arcgis/rest/services,ayn2C2iPvqjeqWoXwV6rjmr43kyo23mhIPnXz2CEiMA6rVu0xR0St8gKsd0olv8a"
		//For ex. (non-secured server): "http://sampleserver1.arcgisonline.com/arcgis/rest/services"
		"http",
		"http://sampleserver1.arcgisonline.com/arcgis/rest/services",
		"http://sampleserver2.arcgisonline.com/arcgis/rest/services",
		"http://feeds.bbc.co.uk/weather/feeds/rss/",
		"http://code.google.com/",
		"http://earthquake.usgs.gov/eqcenter/catalogs" //NOTE - no comma after the last item
    };
    
	// Some content types (XML variants) are not accepted by browser XML parsing
	// This is a map of types to override the content type to "application/xml"
    String[] contentTypesToMapToXml = {
    	"application/vnd.google-earth.kml+xml"
    };
%>
<%
	    try { 
		String reqUrl = request.getQueryString();
		boolean allowed = false;
		String token = null;
		if (reqUrl != null) {
		    for (int i = 0; i < serverUrls.length; i++) {
			String surl = serverUrls[i];
			String[] stokens = surl.split("\\s*,\\s*");
			if (reqUrl.toLowerCase().indexOf(stokens[0].toLowerCase()) >= 0) {
			    allowed = true;
			    if (stokens.length >= 2 && stokens[1].length() > 0) {
				token = stokens[1];
			    }
			    break;
			}
		    }
		}
	
		if (!allowed) {
		    response.setStatus(403);
		    return;
		}
		if (token != null) {
		    reqUrl = reqUrl + (reqUrl.indexOf("?") > -1 ? "&" : "?") + "token=" + token;
		}
		if (reqUrl.startsWith("uri=?") || reqUrl.startsWith("url=?") ) {
            reqUrl = reqUrl.substring(5);
        }
        if (reqUrl.startsWith("uri=") || reqUrl.startsWith("url=") ) {
            reqUrl = reqUrl.substring(4);
        }
        try {
            reqUrl = URLDecoder.decode(reqUrl, "UTF-8");
        } catch (Exception e) {
          	e.printStackTrace();
        }

        // decode and re-encode args
        URL url;
        Pattern p = Pattern.compile("(.+\\?)(.+)");
        Matcher m = p.matcher(reqUrl);
        if (m.matches()) {
            String args = URLDecoder.decode(m.group(2), "US-ASCII");
            String encodedArgs = URLEncoder.encode(args, "US-ASCII");
            encodedArgs = Pattern.compile("%3d", Pattern.CASE_INSENSITIVE).matcher(encodedArgs).replaceAll("=");
            encodedArgs = Pattern.compile("%26").matcher(encodedArgs).replaceAll("&");
            url = new URL(m.group(1)+encodedArgs);
        }
        else {
            url = new URL(reqUrl);
        }
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setDoOutput(true);
		con.setRequestMethod(request.getMethod());
		int clength = request.getContentLength();
		if (clength > 0) {
		    con.setDoInput(true);
		    InputStream istream = request.getInputStream();
		    OutputStream os = con.getOutputStream();
		    final int length = 5000;
		    byte[] bytes = new byte[length];
		    int bytesRead = 0;
		    while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
			os.write(bytes, 0, bytesRead);
		    }
		}
		out.clear();
		out = pageContext.pushBody();
		OutputStream ostream = response.getOutputStream();
		
		// Return content type
		String contentType = con.getContentType();
		response.setContentType(contentType);
		// Override content types with known issues
		if (contentType != null) {
			for (int i = 0; i < contentTypesToMapToXml.length; i++) {
				if (contentType.indexOf(contentTypesToMapToXml[i]) >= 0) {
					response.setContentType("application/xml");
					break;
				}
			}
		}
		InputStream in = con.getInputStream();
		final int length = 5000;
		byte[] bytes = new byte[length];
		int bytesRead = 0;
		while ((bytesRead = in.read(bytes, 0, length)) > 0) {
		    ostream.write(bytes, 0, bytesRead);
		}
	    } catch (Exception e) {
		response.setStatus(500);
 	    }
%>
