// This is a function so that we can hook a callback to get called when the native app is ready for us to call its JavaScript API 
var addNativeReadyFunction = function (callback) {
	// If the gcxNativeReady flag is set, we're ready to call the callback now 
	if (typeof gcxNativeReady !== "undefined") {
		if (callback)
			callback();
	}
		// Otherwise, wait until it's ready 
	else {
		var oldNativeReadyCallback = window.gcxNativeReadyCallback;
		window.gcxNativeReadyCallback = function () {
			if (oldNativeReadyCallback)
				oldNativeReadyCallback();
			if (callback)
				callback();
		}
	}
}

if (navigator.userAgent.indexOf("GeocortexApp") > -1) {
	// If the file system already exists, Cordova is not needed 
	var _cordovaRequestFileSystem;
	if (!window.requestFileSystem) {
		var _requestFileSystemPlaceholder = function () {
			var _storedArguments = arguments;
			var _storedThis = this;

			addNativeReadyFunction(function () {
				if (_cordovaRequestFileSystem && window.requestFileSystem != _cordovaRequestFileSystem)
					window.requestFileSystem = _cordovaRequestFileSystem;
				window.requestFileSystem.apply(_storedThis, _storedArguments);
			});
		}
		window.requestFileSystem = _requestFileSystemPlaceholder;
		if (typeof window.LocalFileSystem === "undefined")
			window.LocalFileSystem = {};
		window.LocalFileSystem.PERSISTENT = 1;
		window.LocalFileSystem.TEMPORARY = 0;

		var pollingToken;
		var _pollForCordovaFileSystem = function () {
			if (window.requestFileSystem != _requestFileSystemPlaceholder) {
				_cordovaRequestFileSystem = window.requestFileSystem;
				window.requestFileSystem = _requestFileSystemPlaceholder;
				window.clearInterval(pollingToken);
			}
		}
		pollingToken = window.setInterval(_pollForCordovaFileSystem, 10);
	}
}