/*
	Add the following to index.html
	
	In the style area add:
	
	#oeLoginNotice {
			display:block;
            width: 95%;
            background-color: #fff;
			text-align: center;
			font-weight: bold;
			height:25px;
			color: rgb(51, 102, 255);
		}
		
	Inside the splash-plate div add:

	<div id="oeLoginNotice">
		Authenticating.  Please wait a moment.
    </div>		

	Include script after loader.js:
	
	<script src="Resources/Compiled/loader.js"></script>	    

    <script>
        // Uncomment the below line to only use local copies of Esri API files. This is done automatically in the Geocortex Mobile App Framework.
        //var geocortexUseLocalEsriApi = true;
        var viewerConfig = {
            "configurations": {
                "default": "Resources/Config/Default/" + shellName + ".json.js"
            },
            "viewerConfigUri": ""
        };
        //Use this and set to true for custom IDE config loads
        //var oeGCXViewerLoaderSkipLogin = true; 
    </script >
       
    <script src="oegcxviewerloader.js"></script>
	
	At the bottom of index.html add:
	
	<iframe id="autoFrame" style="display:none;"></iframe>
	
	In this file change workingSite for the correct site (usually oe or dev)	
	"https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/"
	
*/
var oeGCXViewerLoader = {

    workingSite: "https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/",
    workingURL: "https://tools.oregonexplorer.info/",
    startViewer: function () {

        document.getElementById("oeLoginNotice").style.display = "none";
        document.getElementById("myProgress").style.display = "block";
        console.log("Starting viewer...");
        console.log(this.workingSite);

        new geocortex.essentialsHtmlViewer.ViewerLoader().loadAndInitialize({
            onSiteInitialized: function (app, loader) {
                geocortex.config.io.timeout = 180000; // 180 seconds
            }
        });
    },
    checkSiteAuthentication: function () {

        if (document.referrer.indexOf("SignOutCallback") > -1) {
            window.location.href = this.workingSite + "/security/signIn";
            return;
        }

        document.getElementById("myProgress").style.display = "none";
        document.getElementById("oeLoginNotice").style.display = "block";

        var thisMain = this;
        var targetSite = this.workingSite;
        var vLoader = new geocortex.essentialsHtmlViewer.ViewerLoader();
        var options = {};
        options.onError = function (error, loader) {
            console.log("Options error");
        };

        options.query = new geocortex.framework.application.loading.CaselessMap(new geocortex.framework.application.loading.QueryParameters(location.href));

        try {
            vLoader.obtainConfigFromAlias(options,
                function () {

                    if (typeof options === "undefined" || !options.hasOwnProperty("configBase")) {
                        console.log("Viewer ID error.  No configBase.");
                        window.location.href = "https://tools.oregonexplorer.info/OE_HtmlViewer/Index.html?viewer=oe";
                        return;
                    }

                    var urlPtr = options.configBase.indexOf("sites/") + 6;
                    var urlCloser = options.configBase.indexOf("/", urlPtr);
                    var targetUrl = targetSite + "sites/" + options.configBase.substring(urlPtr, urlCloser);
                    targetUrl += "?f=json";

                    thisMain.makeRequest("GET", null, targetUrl,
                        function (data) {
                            console.log("Site listing object");
                            if (!data.hasOwnProperty("error")) {
                                //site does not have other accounts														
                                oeGCXViewerLoader.checkLogin(false);
                            }
                            else {
                                //site has other accounts													
                                window.location.replace(thisMain.workingSite + "security/signIn");
                                location.reload(true);
                            }
                        },
                        function (data) {
                            console.log("Site detail request error.");
                            thisMain.startViewer();
                        }
                    );

                },
                function (err) {
                    console.log("Alias error");
                    thisMain.startViewer();
                });
        }
        catch (err) {
            console.log("Internal GCX Error.");
            console.log("The viewer id likely doesn't exist");
            thisMain.startViewer();
        }

    },
    checkLogin: function (loadViewerWithGCX) {

        var thisMain = this;
        var requestedURL = encodeURI(window.location);

        var getURL = "";
        if (loadViewerWithGCX)
            getURL = this.workingSite + "security/signIn?token_type=fragment&app=" + requestedURL;
        else
            getURL = this.workingURL + "Geocortex/IdentityServer/account/signin?token_type=fragment&app=" + requestedURL;

        thisMain.makeRequest("GET", null, getURL,
            function (data) {
                var htmlString = JSON.stringify(data);

                //check for login token #gcx
                if (htmlString.indexOf("#gcx") > -1) {
                    //get gcx value
                    var urlPtr = htmlString.indexOf("#gcx-");
                    var urlCloser = htmlString.indexOf("\"", urlPtr) - 1;
                    var gcxToken = htmlString.substring(urlPtr, urlCloser);
                    var newURL = window.location.href + gcxToken;
                    window.location.href = newURL;
                    location.reload(true);
                }
                else if (htmlString.indexOf("currently logged in") > -1 && htmlString.indexOf("not authorized") > -1) {
                    console.log("Account already logged in");
                    thisMain.checkLogin(true);
                    //thisMain.startViewer();
                }
                else if (htmlString.indexOf("RequestSecurityTokenResponseCollection") > -1) {
                    //form auto submit                    
                    //$("#autoFrame").html(data);					
                    var autoFrame = document.getElementById("autoFrame");
                    var frag = document.createRange().createContextualFragment(data);
                    autoFrame.appendChild(frag);
                }
                else if (typeof data === 'object') {
                    console.log("Json OBJECT!");
                    thisMain.startViewer();
                }
                else if (htmlString.indexOf("__RequestVerificationToken") > -1) {
                    //get token
                    var tokenPtr = htmlString.indexOf("__RequestVerificationToken");
                    var valuePtr = htmlString.indexOf("value=", tokenPtr) + 8;
                    var valueCloser = htmlString.indexOf("\"", valuePtr) - 1;
                    var tokenToUse = htmlString.substring(valuePtr, valueCloser);

                    console.log("Login oe_anonymous...");

                    //get action
                    var actionPtr = htmlString.indexOf("form action") + 14;
                    var actionCloser = htmlString.indexOf("\"", actionPtr) - 1;
                    var actionToUse = htmlString.substring(actionPtr, actionCloser);

                    var postString = "wa=wsignin1.0" +
                        "&wtrealm=" + this.workingSite + "security/callback" +
                        "&__RequestVerificationToken=" + tokenToUse +
                        "&UserName=oe_anonymous" +
                        "&Password=oe_anonymous" +
                        "&EnableSSO=true";

                    thisMain.makeRequest("POST", postString, actionToUse,
                        function (data) {

                            if (data.indexOf("signed in as")) {
                                thisMain.checkLogin(true);
                                return;
                            }

                            //form auto submit                            
                            var autoFrame = document.getElementById("autoFrame");
                            var frag = document.createRange().createContextualFragment(data);
                            autoFrame.appendChild(frag);
                            //$("#autoFrame").html(data);
                        },
                        function (data) {
                            console.log("Sign in request error");
                            thisMain.startViewer();
                        }
                    );

                }
                else {
                    console.log("Page not expected!");
                    thisMain.startViewer();
                }
            },
            function (data) {
                console.log("Sign in page error");
                thisMain.startViewer();
            }
        );

    },
    makeRequest: function (requestType, postData, url, callback, callBackError) {
        var thisMain = this;

        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //old ie

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200)
                    callback(xmlhttp.responseText);
                else
                    callBackError(xmlhttp.statusText);
            }
        }

        xmlhttp.open(requestType, url, true);
        if (requestType == "POST") {
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        if (postData)
            xmlhttp.send(postData);
        else
            xmlhttp.send();
    }
};



//check for login token #gcx
if (window.location.href.indexOf("#gcx") > -1 || (typeof oeGCXViewerLoaderSkipLogin !== "undefined" && oeGCXViewerLoaderSkipLogin))
    oeGCXViewerLoader.startViewer();
else
    oeGCXViewerLoader.checkSiteAuthentication();