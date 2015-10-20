#!/usr/bin/env bash

# Ensure present working directory is set to script location
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for f in $(find ./Custom -name '*.ts')
do
	echo "Compiling $f"
	tsc $f
done

echo "Building custom code for the Geocortex Viewer for HTML5."
echo "Compiling module resources..."

java -jar "Tools/ResourceCompilerTool.jar" "Custom/ResourceManifest.xml" "Custom" "Custom" "Custom/Resources/Compiled/Custom.js"

echo "Copying library resources into web directory..."

# Ensure destination directory exists
if [ ! -d "Web/Libraries/Custom" ]; then
	mkdir -p "Web/Libraries/Custom"
fi

cp -R "Custom/Resources/"* "Web/Libraries/Custom"

echo "Done."
