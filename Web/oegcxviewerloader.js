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
	<script src="oegcxviewerloader.js"></script>	
	
	At the bottom of index.html add:
	
	<iframe id="autoFrame" style="display:none;"></iframe>
	
	In this file change workingSite for the correct site (usually oe or dev)
	
	Update the urn_agcx_aid value for OE or DEV. See signIn page for value:
	
	https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/security/signIn?token_type=fragment
	https://tools.oregonexplorer.info/Geocortex/Essentials/dev/REST/security/signIn?token_type=fragment
	
*/
var oeGCXViewerLoader = {			

	workingSite: "https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/",
	startViewer: function(){			
						
		$("#oeLoginNotice").css("display","none");
		$("#myProgress").css("display","block");
		console.log("Starting viewer...");
		console.log(this.workingSite);
		
		var viewerConfig = {
			"configurations": {                
				"default": "Resources/Config/Default/"+shellName+".json.js"                
			},
			"viewerConfigUri": ""
		};
		
		new geocortex.essentialsHtmlViewer.ViewerLoader().loadAndInitialize({
			onSiteInitialized: function (app, loader) {
				geocortex.config.io.timeout = 180 * 1000; // 180 seconds
			}
		});
		
	},
	checkSiteAuthentication: function (){
		
		if(document.referrer.indexOf("SignOutCallback") > -1 )
		{	
			window.location.href = "https://tools.oregonexplorer.info/Geocortex/Essentials/oe/REST/security/signIn";
			return;
		}
					
		$("#myProgress").css("display","none");
		$("#oeLoginNotice").css("display","block");
										
		var viewerConfig = {
			"configurations": {                
				"default": "Resources/Config/Default/"+shellName+".json.js"                
			},
			"viewerConfigUri": ""
		};
		
		var thisMain = this;
		var targetSite = this.workingSite;
		var vLoader = new geocortex.essentialsHtmlViewer.ViewerLoader();
		var options = {};                
		options.onError = function (error, loader) {
			console.log("Options error");
		};
		
		options.query = new geocortex.framework.application.loading.CaselessMap(new geocortex.framework.application.loading.QueryParameters(location.href));
										
		try
		{
			vLoader.obtainConfigFromAlias(options,
			function(){							

				if(typeof options === "undefined" || !options.hasOwnProperty("configBase"))
				{
					console.log("Viewer ID error.  No configBase.");
					//force OE to load.
					//thisMain.checkSiteAuthentication(true);
					window.location.href = "https://tools.oregonexplorer.info/OE_HtmlViewer/indexSignIn.html?viewer=oe";					
					return;
				}
			
				var urlPtr = options.configBase.indexOf("sites/")+6;
				var urlCloser = options.configBase.indexOf("/",urlPtr);
				var targetUrl = targetSite+"sites/" + options.configBase.substring(urlPtr,urlCloser);
				targetUrl += "?f=json";
				
				console.log("Site listing request: "+targetUrl);
				
				$.get( targetUrl, function(data) {
				})
				.done(function(data) {
					console.log("Site listing object");
					console.log(data);
					if(!data.hasOwnProperty("error"))
					{
						//site does not have other accounts														
						oeGCXViewerLoader.checkLogin();							
					}
					else
					{
						//site has other accounts													
						window.location.replace(thisMain.workingSite+"security/signIn");
						location.reload(true);							
					}
				})
				.fail(function(data) {
				  console.log("Site detail request error.");
				  console.log(JSON.stringify(data));
				  thisMain.startViewer();
				});
			},
			function (err) {
				console.log("Alias error");
				thisMain.startViewer();
			});
		}
		catch(err)
		{
			console.log("Internal GCX Error.");
			console.log("The viewer id likely doesn't exist");
			thisMain.startViewer();
		}
						
	},
	checkLogin: function() {

		var thisMain = this;
		var requestedURL = encodeURI(window.location);										
		var jqxhr = $.get( this.workingSite+"security/signIn?token_type=fragment&app="+requestedURL+"&idp_name=urn%3agcx%3aidp%3a2FE8F726-EF2C-4F9E-A937-3D5967531B64", function() {          
		})
		  .done(function(data) {
			var htmlString = JSON.stringify(data);			  
								
			//check for login token #gcx
			if(htmlString.indexOf("#gcx")>-1)
			{
				//go to this url						
				var urlPtr = htmlString.indexOf("<form action=")+15;
				var urlCloser = htmlString.indexOf("\"",urlPtr)-1;
				var targetUrl = htmlString.substring(urlPtr,urlCloser);
				console.log("Token ready. Go to: "+targetUrl);
				//window.location.assign(targetUrl);
				window.location.replace(targetUrl);
				location.reload(true);
				return;
			}		
			else if(htmlString.indexOf("RequestSecurityTokenResponseCollection")>-1)
			{
				//form auto submit
				$("#autoFrame").html(data);
			}
			else if(typeof data === 'object')
			{
				console.log("Json OBJECT!");
				console.log(data);
				thisMain.startViewer();
			}
			else if(htmlString.indexOf("__RequestVerificationToken")>-1)
			{
				//get token
				var tokenPtr = htmlString.indexOf("__RequestVerificationToken");
				var valuePtr = htmlString.indexOf("value=",tokenPtr)+8;
				var valueCloser = htmlString.indexOf("\"",valuePtr)-1;			  							  			  
				var tokenToUse = htmlString.substring(valuePtr,valueCloser);
				
				console.log("Login oe_anonymous...");
				
				//get action
				var actionPtr = htmlString.indexOf("form action")+14;
				var actionCloser = htmlString.indexOf("\"",actionPtr)-1;
				var actionToUse = htmlString.substring(actionPtr,actionCloser);
				
				console.log("Action to use: "+actionToUse);				
						  
			  $.post(actionToUse,{
				"wa": "wsignin1.0",
				"wtrealm":this.workingSite+"security/callback",
				"__RequestVerificationToken": tokenToUse,
				"UserName":"oe_anonymous",
				"Password":"oe_anonymous",
				"EnableSSO":true
			  })
				.done(function(data) {												
					//form auto submit
					$("#autoFrame").html(data);
				})
				.fail(function(data) {
					  console.log("Sign in request error");
					  console.log(JSON.stringify(data));
					  thisMain.startViewer();
				  });
			}
			else
			{
				console.log("Page not expected!");
				console.log(data);
				thisMain.startViewer();
			}
												  
			
		  })
		  .fail(function(data) {
			  console.log("Sign in page error");
			  console.log(JSON.stringify(data));
			  thisMain.startViewer();
		  });
	}
};



//check for login token #gcx
if(window.location.href.indexOf("#gcx")>-1)
	oeGCXViewerLoader.startViewer();
else
	oeGCXViewerLoader.checkSiteAuthentication();