<%@ Page Language="C#" %>
<%@ Import Namespace="System.Security.Cryptography" %>

<!DOCTYPE html>
<html>
<head>
    <title>Pictometry</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link href="3rdParty.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="<% Response.Write(IpaJsLibUrl); %>"></script>
    <script src="../Scripts/Bridge.js"></script>
    <script src="ThirdPartyMap.js"></script>

    <script runat="server">
    
        /**#
         * Note: This comment will be removed during the build process (if wrapped by hash tags).
         * If you change the 'ApiKey' or 'SecretKey' variable name, the 3rd party test (Testing/test/release-package/viewer)
         * and post build task (_SolutionItems/_Build/Common/Targets/Geocortex.Common.targets) will need to be updated.
         * 
         * This key is only valid on http://localhost/
        #*/
        protected static string ApiKey = "217DD3D3A9240810D4BFE9E0F9E723E7";
        protected static string SecretKey = "28F23E74530E5EFFDDECA0C75FFF1E2D56342EF7CDFD067FF800CF5ADDDB97D16AAE53897D1DE038D704FD7211A14975E64AD81218617F3563028B5EE5642DFCE6F79B64AD171057E752B99A1F779825164225D4599DF2DE3240576099750DE7AC7A508EA7CB5E332CB0024077978CAE019EF6DBDB49203F78C353EDDFE80530";
        public string IpaLoadUrl = "http://pol.pictometry.com/ipa/v1/load.php";
        public string IpaJsLibUrl = "http://pol.pictometry.com/ipa/v1/embed/host.php?apikey=" + ApiKey;
        public string IframeId = "pictometry_ipa";

        public string SignedUrl
        {
            get
            {
                // create timestamp
                TimeSpan span = (DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc));
                Int64 ts = (long)Math.Floor(span.TotalSeconds);

                // create the url
                string url = IpaLoadUrl + "?apikey=" + ApiKey + "&ts=" + ts;

                // generate the hash
                ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
                HMACMD5 hmac = new HMACMD5(encoding.GetBytes(SecretKey));
                byte[] hash = hmac.ComputeHash(encoding.GetBytes(url));

                // convert hash to digital signature string
                string signature = BitConverter.ToString(hash).Replace("-", "").ToLower();

                // create the signed url
                string signedUrl = url + "&ds=" + signature + "&app_id=" + IframeId;

                return signedUrl;
            }
        }
    </script>

    <script type="text/javascript">

        var ipa = new PictometryHost('<% Response.Write(IframeId); %>', '<% Response.Write(IpaLoadUrl); %>');
        var currentView = { x: 0, y: 0, zoom: 10 };
        var isReady = false;
        var headings = {
            "N": 0,
            "E": 90,
            "S": 180,
            "W": 270
        };

        var thirdPartyMap = new geocortex.essentialsHtmlViewer.integration.ThirdPartyMap("pictometry",
            initializeMap,
            getMapViewpointParams,
            handleViewerPositionUpdatedEvent,
            handleViewpointIndicatorUpdatedEvent);

        /**
         * Initializes the Pictometry IPA.
         */
        function initializeMap() {
            ipa.ready = function () {
                ipa.setPreferences({
                    enableSynchronization: true
                });

                ipa.addListener("error", function (error) {
                    console.log("Error: " + JSON.stringify(error));
                });

                ipa.addListener("synchronize", function (view) {
                    if (currentView.x != view.x && currentView.y != view.y) {
                        currentView = view;
                        thirdPartyMap.handleViewpointChanged();
                    }
                });

                ipa.setLocation(currentView.x, currentView.y);
                isReady = true;
            };
        }

        /**
         * Gets the current position of the Pictometry map.
         */ 
        function getMapViewpointParams() {
            return {
                center: {
                    x: currentView.x,
                    y: currentView.y
                },
                heading: headings[currentView.orientation]
            };
        }

        /**
         * Updates the Pictometry map to match the viewer.
         */
        function handleViewerPositionUpdatedEvent(arg) {
            currentZoom = thirdPartyMap.scaleToZoomLevel(arg.scale);

            if (!isReady) {
                currentView.x = arg.position.y;
                currentView.y = arg.position.x;
            }

            ipa.setLocation(arg.position.y, arg.position.x, currentZoom);
        }

        /**
         * Updates the Pictometry map to match the viewpoint indicator position.
         */
        function handleViewpointIndicatorUpdatedEvent(arg) {
            ipa.setLocation(arg.y, arg.x);
        }

    </script>
</head>
<body>
    <ul class="integration-panel-actions">
        <li class="panel-action-button">
            <button class="viewpoint-indicator viewpoint-indicator-pictometry" title="Viewpoint Indicator"></button>
        </li>
        <li class="panel-action-button">
            <button id="centerButton" class="center-map" title="Center this map to the viewer"></button>
        </li>
        <li class="panel-action-button">
            <button id="syncButton" class="sync-toggle-off" title="Synchronize Maps"></button>
        </li>
        <li class="panel-action-button">
            <button id="dockButton" class="window-popout" title="Open in new window"></button>
        </li>
        <li class="panel-action-button">
            <button id="closeButton" class="window-close" title="Close this map view"></button>
        </li>
    </ul>
    <iframe id="<% Response.Write(IframeId); %>" src="<% Response.Write(SignedUrl); %>"></iframe>
</body>
</html>
