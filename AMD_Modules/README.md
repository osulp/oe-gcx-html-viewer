# GVH Module Bundler
This tool provides a starting point for developing AMD (Asynchronous Module Definition) modules for the Geocortex Viewer for HTML5 2.8.1 and later. This tool assumes that your modules are written in [TypeScript](http://www.typescriptlang.org/). We've provided two sample modules in the `/src` folder which can be built, using this tool, into AMD modules that can be loaded into the Geocortex Viewer for HTML5.

## Dependencies
**You’ll need to have [Node](https://nodejs.org/en/) >= 6 on your machine**. You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for the build tool itself.

## Usage
The first step is to download all dependencies. To do this, open a command terminal, navigate to `/QuickStart` and then run:   
```sh
npm install
```

This will install all the dependencies found in `/QuickStart/package.json`

Once that finishes, invoke the build by running:   
```sh
npm run build
```

The compiled module .js files will be placed in  `/QuickStart/dist`.

### Options:
| Command      | Default  | Description|
| ------------- |-------------| -----|
| `--libraryId`     | `"Quickstart"` | The id of the library that will be specified in the viewer config. |
| `--namespace`     | `"geocortex/quickstart"`      |   AMD namespace prefix for each module. |
| `--sourceDir`     | `"src"` | The source folder containing the modules to build. |
| `--outDir` | `"dist"`   |    Folder where the module bundle files will be emitted. This is handy for outputting directly into the viewer folder that you are testing in for quick iteration. |
| `--outFile` | `null`   |    File path where a concatenated output of all module bundles will be written to. If using this `--outdir` will be ignored. |
| `--minify`      | `false`      |   Minify build output for smaller file sizes.

The parameter `libraryId` must be unique among the other libraries registered in your configuration file. It must match the id chosen when registering the new library and module in configuration as shown in the [Loading modules in the Viewer](#loading-modules-in-the-viewer) section.

#### Example using options:
```sh
npm run build -- --outDir "../Viewer/Resources/Compiled" --minify
```

- **Note that the extra '`--`' is required**

## Loading modules in the Viewer
In order to load the module in the viewer, you will need to specify the configuration for your module library and the individual modules in your viewer configuration file. Below is an example defining a new library with one module. Note how we've used the default library id of `Quickstart`, the default module namespace of `geocortex/quickstart`, and we've put the compiled output into our `Resources/Compiled` folder in the viewer.

In your `libraries` section:
```js
  "libraries": [
   {
	"id": "Quickstart",
	"async": true,
	"location": "Resources/Compiled",
	"locales": [
		{
			"locale": "inv",
			"uri": "Resources/Compiled/Quickstart-Language.json"
		}
	]
   },
   ...
```

In your `modules` section:
```js
{
	"moduleName": "Template",
	"libraryId": "Quickstart",
	"require": "geocortex/quickstart/Template/TemplateModule",
	"configuration": {},
	"views": [{
		"id": "TemplateView",
		"require": "geocortex/quickstart/Template/TemplateView",
		"markup": "geocortex/quickstart/Template/TemplateView.html",
		"viewModelId": "TemplateViewModel",
		"region": "TopRightMapRegion",
		"visible": true
		}
	],
	"viewModels": [{
		"id": "TemplateViewModel",
		"require": "geocortex/quickstart/Template/TemplateViewModel"
		}
	]
},
{
	"moduleName": "OtherTemplate",
	"libraryId": "Quickstart",
	"require": "geocortex/quickstart/OtherTemplate/OtherTemplateModule",
	"configuration": {},
	"views": [{
		"id": "OtherTemplateView",
		"require": "geocortex/quickstart/OtherTemplate/OtherTemplateView",
		"markup": "geocortex/quickstart/OtherTemplate/OtherTemplateView.html",
		"viewModelId": "OtherTemplateViewModel",
		"region": "TopRightMapRegion",
		"visible": true
		}
	],
	"viewModels": [{
		"id": "OtherTemplateViewModel",
		"require": "geocortex/quickstart/OtherTemplate/OtherTemplateViewModel"
		}
	]
},
...
```

## Notes

- All `Language.json` files will be bundled into a single `[libraryId]-Language.json` file in the output directory.
- All `.css` files in the module folders will be bundled together (and loaded) with the module's `.js` output files.
- If you need to use a different version of typescript, you can open `/QuickStart/package.json` and change the typescript version used by the project in the "devDependencies" section:
```js
"devDependencies": {
    "typescript": "~2.3.4", // Change this to whatever version you want to use
    "@types/react-dom": "^15.5.5",
    "tslint": "^5.4.2",
    "eslint": "^3.19.0"
  },
```
- not all versions of typescript will work with GVH.