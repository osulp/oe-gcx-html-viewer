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
		Please wait a moment.
    </div>		

	Include script and auto frame after loader.js:
	
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
       
	<iframe id="autoFrame" style="display:none;"></iframe>
    <script src="oegcxviewerloader.js"></script>
	
	In this file change workingSite for the correct site (usually oe or dev)	
	"https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/"
	
*/
var oeGCXViewerLoader = {

    workingSite: "https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/",
    workingURL: "https://tools.oregonexplorer.info/",    

    startViewer: function () {

        //console.log("Cookie: "+this.getCookie("oregonExplorerAutoLoginParams"));
        //console.log("Referrer: "+document.referrer);

        if (document.referrer == "https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/security/callback" &&
            this.getCookie("oregonExplorerAutoLoginParams").length > 0) {
            var insertPtr = window.location.href.indexOf("#");
            var newURL = window.location.href.substring(0, insertPtr) + this.getCookie("oregonExplorerAutoLoginParams") + window.location.href.substring(insertPtr, window.location.href.length);
            //console.log("New url: "+newURL);
            window.location.href = newURL;
            //location.reload(true);
            return;
        }

        document.getElementById("oeLoginNotice").style.display = "none";
        document.getElementById("myProgress").style.display = "block";
        console.log("Starting viewer...");
        console.log(this.workingSite);

        let thisRef = this;

        new geocortex.essentialsHtmlViewer.ViewerLoader().loadAndInitialize({
            onSiteInitialized: function (app, loader) {
                geocortex.config.io.timeout = 180000; // 180 seconds				
            },
            onError: function (resource, error) {
                if (resource.message.toLowerCase().indexOf("cannot access the desired resource") > -1) {
                    document.getElementById("oeAuthenticate").style.display = "block";
                    document.getElementById("oeAuthSignout").addEventListener("click", function () {
                        thisRef.signOut(thisRef);
                    });
                }
            }
        });
    },
    signOut: function (oeLoader) {
        //document.getElementById("oeAuthName").text = resource.message;		
        var requestedURL = encodeURI(window.location);
        var newURL = oeLoader.workingSite + "security/signOut";
        window.location.href = newURL;
    },
    signIn: function () {
        var newURL = this.workingSite + "security/signIn?token_type=fragment";
        window.location.href = newURL;
    },
    checkSiteAuthentication: function () {

        if (document.referrer.indexOf("SignOutCallback") > -1) {
            window.location.href = this.workingSite + "/security/signIn";
            return;
        }

        document.getElementById("myProgress").style.display = "none";
        document.getElementById("oeLoginNotice").style.display = "block";

        var results = new RegExp('[\?&]' + 'viewer' + '=([^&#]*)').exec(window.location.href);
        var targetUrl = this.workingSite + "viewers/" + decodeURI(results[1]) + "?f=json";

        var d = new Date();
        console.log("Viewers request start: " + d.toString());

        var thisMain = this;
        thisMain.makeRequest("GET", null, targetUrl,
            function (data) {
                console.log("Site listing object");
                jObject = JSON.parse(data);

                var d = new Date();
                console.log("Viewers request end: " + d.toString());

                if (jObject.isAuthorized) {
                    //site does not have other accounts
                    oeGCXViewerLoader.checkLogin(false);
                }
                else if (!jObject.isAuthorized) {

                    //var newURL = thisMain.workingSite + "security/signOut";
                    //window.location.href = newURL;
                    oeGCXViewerLoader.checkLogin(false);
                }
                else {
                    //error, no site?
                    console.log("Site not found");
                    thisMain.startViewer();
                }
            },
            function (data) {
                console.log("Site detail request error.");
                thisMain.startViewer();
            }
        );

    },
    checkLogin: function (loadViewerWithGCX) {

        var thisMain = this;
        var requestedURL = encodeURI(window.location);

        //var paramsURL = new URL(requestedURL);
        //var paramAction = paramsURL.searchParams.get("action");
        //var allParams = null;
        if (requestedURL.indexOf("?") > -1 && requestedURL.indexOf("&") > -1) {
            //console.log(requestedURL.indexOf("?"));
            //console.log(requestedURL.length-1);
            var allParams = requestedURL.substring(requestedURL.indexOf("&"), requestedURL.length);
            this.setCookie("oregonExplorerAutoLoginParams", allParams, .1);
        }
        else {
            this.setCookie("oregonExplorerAutoLoginParams", allParams, -10);
        }

        var getURL = "";
        if (loadViewerWithGCX)
            getURL = this.workingSite + "security/signIn?token_type=fragment&app=" + requestedURL;
        else
            getURL = this.workingURL + "Geocortex/IdentityServer/account/signin?token_type=fragment&app=" + requestedURL;

        thisMain.makeRequest("GET", null, getURL,
            function (data) {
                var htmlString = JSON.stringify(data);

                //check if user is logged in
                var activeUser = "";
                if (htmlString.indexOf("(signed in as") > -1) {
                    var userPtr = htmlString.indexOf("(signed in as") + "(signed in as".length + 1;
                    var userCloser = htmlString.indexOf(")", urlPtr);
                    activeUser = htmlString.substring(userPtr, userCloser);
                    console.log("Account already logged in: " + activeUser);
                }

                //get viewer name
                var vPtr = htmlString.indexOf("viewer=") + "viewer=".length;
                var vCloser = htmlString.indexOf("\"", vPtr) - 1;
                var targetViewer = htmlString.substring(vPtr, vCloser).trim().toLowerCase();
                console.log("Viewer: " + targetViewer);

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
                //else if (htmlString.indexOf("currently logged in") > -1 && htmlString.indexOf("not authorized") > -1) {
                else if (htmlString.indexOf("(signed in as") > -1) {
                    thisMain.checkLogin(true);                    
                }
                else if (htmlString.indexOf("RequestSecurityTokenResponseCollection") > -1) {

                    //console.log(data);
                    //return;

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
    },
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
};



//check for login token #gcx
if (typeof oeGCXViewerLoaderSkipLogin !== "undefined" && oeGCXViewerLoaderSkipLogin)
    oeGCXViewerLoader.startViewer();
else if (typeof document.referrer !== "undefined" && (document.referrer.indexOf("wsfed") > -1 || document.referrer == window.location.href))
    oeGCXViewerLoader.signIn();
else if (window.location.href.indexOf("#gcx") > -1)
    oeGCXViewerLoader.startViewer();
else
    oeGCXViewerLoader.checkSiteAuthentication();