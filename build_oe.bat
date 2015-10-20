ECHO OFF
SETLOCAL enabledelayedexpansion enableextensions

ECHO Building custom code for the Geocortex Viewer for HTML5.
ECHO Compiling module resources...

SET files=
FOR /r "Custom\Modules" %%i IN (*.ts) DO (
	SET files=!files! "%%i"
)

tsc --out "custom_ts_out.js" %files%

java -jar "Tools\ResourceCompilerTool.jar" "Custom\ResourceManifest.xml" "Custom" "Custom" "Custom\Resources\Compiled\Custom.js" --export "Web\Resources\Locales"

ECHO Moving language files into locales folder...
 
move "Web\Resources\Locales\Invariant.json" "Web\Resources\Locales\Custom.en-US.json.js"

ECHO Copying library resources into web folder...

ECHO D | xcopy /E /Y /D "Custom\Resources" "Web\Libraries\Custom"

ECHO Done.