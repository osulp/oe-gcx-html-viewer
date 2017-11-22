"use strict";

/* eslint-disable no-console */

const gulp = require("gulp");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const argv = require("yargs").argv;
const mkdirp = require("mkdirp");
const gutil = require("gulp-util");
const concat = require("gulp-concat");
const ts = require("gulp-typescript");
const tsVersion = require("typescript").version;
const merge = require("merge2");
const through = require("through2");
const uglifyJS = require("uglify-js");

// TODO: Support supplying arguments via a .json file similar to tsconfig.json
// Arguments provided by the CLI
const libraryId = argv.libraryId || "Quickstart";
const namespace = argv.namespace || "geocortex/quickstart";
/** 
 * This allows the markup resources to have a different namespace prefix compared to the javascript AMD modules.
 * Going forward we won't recommend using this, but we need to support older markup paths such as 'Mapping/', etc.
 */
const markupNamespace = argv.markupNamespace || namespace;
const sourcePath = argv.sourceDir || "./src";
const additionalLanguagePath = argv.languagePath;
const outputLanguageFile = argv.outLanguageFile;
const outputDeclarationFile = argv.outDeclarationFile;
const outputPath = argv.outDir || "./dist";
const outputFile = argv.outFile;
const minify = argv.minify || false;
const isWatchMode = argv._.includes("watch");

/** Used to replace absolute file paths to relative paths from the source folder */
const sourceSearchString = sourcePath.replace(/\\/g, "/") + "/";

/** Flag which keeps track if the TypeScript compile emitted errors. */
let tsCompileFailed = false;
let buildStartTime;
let tsOutput = {};

/**
 * Read a given file from disk and return a specific encoding.
 * @param {string} path Path to the file.
 * @param {string} encoding Encoding to return.
 */
function readFile(path, encoding) {
    // Always encode first in utf-8, remove BOB and then either return or convert to base64 string for invariants.
    const fileContent = fs.readFileSync(`${path}`, "utf-8").replace(/^\uFEFF/, "");
    if (encoding === "utf-8") {
        return fileContent;
    }
    else {
        return new Buffer(fileContent).toString("base64");
    }
}

/**
 * Return the path to the file beginning with the module folder.
 * @param {string} path Path of the file.
 * @param {boolean} withExtension Return the file extension.
 * @param {string} base The base of the path where the path should begin.
 */
function getRelativeFilePath(path, withExtension, base) {
    // Glob returns full path with base "./modules....", get just the path relative to the source folder
    // This can then be combined with the namespace to form a full AMD module name
    return path.substring(path.indexOf(base) + base.length, withExtension ? path.length : path.lastIndexOf("."));
}

/**
 * Create the resourceManager.register() function calls for all the invariant resources specified.
 * @param {string[]} filePaths Array of file paths.
 * @param {string} type Either 'json or 'css.
 * @param {string} moduleName Name of the module. e.g. 'Template'.
 */
function makeInvariants(filePaths, type) {
    // TODO: Run the resource through minifer (cssnano for css)
    let bundledInvariants = "";
    filePaths.forEach(path => {
        const fileContent = readFile(path, "base-64");
        // A different bundle is required whether this is a json file or a css file we are bundling 
        bundledInvariants += `imports.resourceManager.register("${libraryId}", "inv", "${type === 'json' ? 'Invariant' : `${markupNamespace}/${getRelativeFilePath(path, true, sourceSearchString)}`}", "${type}", "${fileContent}");\n`
    });
    return bundledInvariants;
}

/**
 * Generate a single language JSON file from all Language.json files
 * in the source directory.
 * @param {string[]} files Source language files.
 */
function makeLanguage(files) {
    let filesObj = {};
    files.forEach(path => {
        const fileContent = readFile(path, "utf-8");
        try {
            const obj = JSON.parse(fileContent);
            filesObj = Object.assign({}, obj, filesObj);
        }
        catch (e) {
            console.error(`Error parsing language file ${path}`, e);
        }
    });
    return filesObj;
}

/**
 * Bundle TypeScript output into AMD module bundles to be consumed by GVH.
 */
function bundleFiles() {
    if (tsCompileFailed) {
        console.warn(gutil.colors.yellow("Skipping module bundling due to errors in TypeScript compile"));
        return;
    }

    console.log("TypeScript compile finished");
    console.log("Bundling modules...");

    // Get all modules we need to bundle
    const modules = fs.readdirSync(sourcePath);

    let languageBundle = {};
    let modulesPayloads = "";
    const tsOutputKeys = Object.keys(tsOutput);

    modules.forEach(moduleName => {
        // Ignore tsconfig.json/tslint.json files as they will mistakenly get bundled with language resources.
        // The bin and obj directories may contain .json metadata files.
        if (moduleName.toLowerCase().indexOf("tsconfig") > -1 ||
            moduleName.toLowerCase().indexOf("tslint") > -1 ||
            moduleName.toLowerCase() === "bin" ||
            moduleName.toLowerCase() === "obj") {
            return;
        }

        // Retrieve any js emitted by TypeScript, as well as any html/json/css files
        // in this module directory (at any depth in the module folder structure)
        let files = tsOutputKeys.filter(key => key.startsWith(moduleName));
        // let jsSourcePaths = glob.sync(`${jsTempDir}/${moduleName}/**/*.js`);
        let markupPaths = glob.sync(`${sourcePath}/${moduleName}/**/*.html`);
        let cssPaths = glob.sync(`${sourcePath}/${moduleName}/**/*.css`);
        let jsonPaths = glob.sync(`${sourcePath}/${moduleName}/**/*.json`);
        let shimsPaths = glob.sync(`${sourcePath}/${moduleName}/**/shims.js`);

        // Supports files in the root of the source directory
        // Works well when budling into a single file such as Mapping.Infrastructure
        if (moduleName.toLowerCase().endsWith(".ts") && files.length === 0) {
            const fileNameToSearch = moduleName.replace(".ts", ".js");
            files = tsOutputKeys.filter(key => key === fileNameToSearch);
        }
        else if (moduleName.toLowerCase().endsWith(".html") && markupPaths.length === 0) {
            markupPaths = glob.sync(`${sourcePath}/${moduleName}`);
        }
        else if (moduleName.toLowerCase().endsWith(".css") && cssPaths.length === 0) {
            cssPaths = glob.sync(`${sourcePath}/${moduleName}`);
        }
        else if (moduleName.toLowerCase().endsWith(".json") && cssPaths.length === 0) {
            jsonPaths = glob.sync(`${sourcePath}/${moduleName}`);
        }
        else if (moduleName.toLowerCase() === "shims.js" && shimsPaths.length === 0) {
            shimsPaths = glob.sync(`${sourcePath}/${moduleName}`);
        }

        languageBundle = Object.assign({}, languageBundle, makeLanguage(jsonPaths));

        let bundledResources = "";

        // For each .js file, let's create the string that it will be used with 'require' in config and wrap the 
        // file content in a function        
        files.forEach(filePath => {

            const packageFileName = `${namespace}/${filePath.replace(".js", "")}`;

            bundledResources += `"${packageFileName}": function () {\n${tsOutput[filePath].toString()}\n},\n`;
        });

        const markupVariables = [];
        let markupResourceCounter = 1;
        let bundledMarkup = "";

        // Append markup files
        markupPaths.forEach(path => {
            const file = readFile(path, "utf-8");

            // Need to remove new lines, single and double quotes
            const markupContent = `${file.replace(/\r?\n|\r/g, "").replace(/'|"/g, "\\'")}`;
            const markupPath = `${markupNamespace}/${getRelativeFilePath(path, true, sourceSearchString)}`;

            const variableName = `markup${markupResourceCounter}`;
            markupResourceCounter++;

            markupVariables.push({
                name: variableName,
                value: markupContent
            });

            // We use a reference to a variable at the top of this bundle file.
            // This is so we can register the markup resouce in both the require.cache,
            // as well as the resourceManager, without bloating this bundle file with duplicate data.
            // If the markup is referenced in config, Framework will take care of registering the markup with the resourceManager for us.
            // However, if the markup is not registered in the resourceManager and the markup isn't referenced
            // in the viewer config file, we will get runtime errors if we try to programatically create a view
            // referencing this markup file.
            bundledResources += `"url:/${markupPath}": ${variableName},\n`;
            bundledMarkup += `imports.resourceManager.register("${libraryId}", "inv", "${markupPath}", "html", ${variableName});\n`;
        });

        let bundledInvariants = makeInvariants(cssPaths, "css");

        // In order to support dated config files we need to import shims in case we found any
        let bundledShims = shimsPaths.map(path => readFile(path, "utf-8")).join("\n");

        // HACK ALERT:
        // Dojo will not prime the cache with these modules until some time later unless we force it 
        // using the empty require({cache:{}}) call.
        // Previously if we had a define() at the bottom of the bundle with some shim function calls, the 
        // call to define() seemed to prompt the cache to be updated.
        // However if we switch to using require() for the shims, the dependencies won't be found in the 
        // cache and we will get errors. This hack forces dojo to update the cache prior to our require()
        // call to shim the global namespace.
        // The need for using require() instead of define() supports bundling multiple module bundles into 
        // a single bundle file, or else we get a 'multiple define error' from dojo.
        // There is a GitHub issue referring to this cache priming issue here:
        // https://github.com/dojo/loader/issues/124
        if (bundledShims.length) {
            bundledShims = "require({cache:{}});\n" + bundledShims;
        }

        const bundledMarkupVariables = markupVariables.reduce((prev, variable) => prev += `var ${variable.name} = '${variable.value}';\n`, "");

        // Let's wrap this module and add bundled invariants
        const bundledInvariantsString = bundledInvariants || bundledMarkup ? `require(["geocortex/framework/resourceManager"], function (imports) {${bundledInvariants}\n${bundledMarkup}});` : "";

        // If there's nothing to emit, let's skip to the next module
        // In some cases such as interface files, they won't emit anything worth including in the bundled javascript
        if (!bundledMarkupVariables &&
            !bundledResources &&
            !bundledInvariantsString &&
            !bundledShims) {
            return;
        }

        if (bundledResources) {
            bundledResources = `require({
    cache: {
        ${bundledResources}
    }
});`;
        }

        // Wrap the payload in an IIFE to limit scope of variables (such as the markup variables)
        let modulePayload = `\n// Module '${moduleName}'
        (function () {
${bundledMarkupVariables}
${bundledResources}
${bundledInvariantsString}
${bundledShims}
})();\n`;

        // If release, minify payload
        if (minify) {
            modulePayload = uglifyJS.minify(modulePayload).code;
        }

        // If we are bundling all the module bundles into one file, let's hold on to the output instead of writing to disk
        if (outputFile) {
            modulesPayloads += modulePayload;
        }
        // Write the module bundle to disk
        else {
            // Make sure the directory exists    
            mkdirp.sync(outputPath);

            // Write file to disk
            const filePath = `${path.join(outputPath, moduleName)}.js`;
            fs.writeFileSync(filePath, modulePayload, { flag: "w" });
        }
    });

    if (outputFile) {
        // Make sure the directory exists      
        mkdirp.sync(path.dirname(outputFile));

        // Write file to disk
        console.log(`Writing bundled JavaScript to ${outputFile}`);
        fs.writeFileSync(outputFile, modulesPayloads, { flag: "w" });
    }
    else {
        console.log(`Writing JavaScript bundle files to ${outputPath}`);
    }

    if (additionalLanguagePath) {
        const additionalLanguages = glob.sync(additionalLanguagePath);
        languageBundle = Object.assign({}, languageBundle, makeLanguage(additionalLanguages));
    }

    if (Object.getOwnPropertyNames(languageBundle).length > 0) {
        let languagePath = outputLanguageFile;

        if (!languagePath) {
            languagePath = `${path.join(outputPath, `${libraryId}-Language.json`)}`;
        }

        mkdirp(outputPath);

        console.log(`Writing language JSON to ${languagePath}`);
        fs.writeFileSync(languagePath, JSON.stringify(languageBundle, null, '\t'), { flag: "w" });
    }

    // Clean up the object which we used to store the TypeScript output
    tsOutput = {};

    const buildEndTime = new Date();
    const buildTimeSeconds = (buildEndTime.getTime() - buildStartTime.getTime()) / 1000;
    console.log("Module bundling finished");
    console.log(gutil.colors.green(`Build completed successfully in ${buildTimeSeconds}s`));
}

/**
 * Processes .d.ts declaration files to be ready for concatenation.
 * @param {object} foundReferences Dictionary of TS declaration file reference comments file names.
 * @param {string} namespace Namespace for this library. ex. "geocortex/framework".
 */
function processsDeclarationFiles(foundReferences, namespace) {
    return through.obj((file, encoding, callback) => {
        let contents = file.contents.toString();
        const base = file.base.replace(/\\/g, "/");
        const relativeFilePath = file.path.replace(base, "");
        const relativeFileDir = path.dirname(relativeFilePath);

        // Remove all triple slash declaration file references.
        // They will be added back to the top of the concatenated file.
        contents = contents.replace(/\/\/\/ <reference path=".+>\n/g, substring => {
            // Keep track of the declaration file name this module is referencing
            const referenceFilePath = substring.match(/"(.+)"/)[0].replace(/\"/g, "");
            const referenceFileName = path.basename(referenceFilePath);
            // We use a dictionary instead of array to easily get rid of duplicate references
            foundReferences[referenceFileName] = true;

            // Remove the /// <reference="..." /> from the definition file
            return "";
        });

        // Can't declare a class when it is inside a declared module which we do below.
        // TypeScript gets quite unhappy.
        contents = contents.replace(/declare /g, "");

        // import { Foo } from "some/relative/path" => import { Foo } from "geocortex/some/relative/path"
        // Lets ignore absolute imports such as "geocortex/framework"
        // We're only concerened with relative imports such as: 
        // "./foo/bar"
        // "./../foo/bar"
        // "../foo/bar"
        // etc
        contents = contents.replace(/\} from "([\.|\.\.].*)"/gm, (str, ...args) => {
            const moduleName = args[0];

            const importPath = path.join(namespace, relativeFileDir, moduleName).replace(/\\/g, "/");

            return `} from "${importPath}"`;
        });

        // Get a path relative to the source directory. We will prepend this to the AMD namespace
        // ex. "observables" => "geocortex/framework/observables"
        contents = `declare module "${namespace}/${relativeFilePath.replace(".d.ts", "")}" {\n${contents}\n}`;

        file.contents = Buffer.from(contents, "utf-8");

        callback(null, file);
    });
}

/**
 * Add TypeScript declaration file reference comments to top of declaration file.
 * @param {object} foundReferencesDict 
 */
function addDeclarationReferences(foundReferencesDict) {
    return through.obj((file, encoding, callback) => {
        const foundReferences = Object.keys(foundReferencesDict);

        let contents = file.contents.toString();

        const references = foundReferences.reduce((previous, fileName) => (previous + `/// <reference path="${fileName}" />\n`), "");

        file.contents = Buffer.from(references + contents, "utf-8");

        callback(null, file);
    });
}

function processTypescriptOutput() {
    return through.obj((file, encoding, callback) => {
        const base = file.base.replace(/\\/g, "/");
        const relativeFilePath = file.path.replace(base, "");
        tsOutput[relativeFilePath] = file.contents;

        callback();
    });
}

// Declare the TypeScript project outside of the task.
// This is recommended by gulp-typescript especially when using watch mode
// to allow for incremental compilation.
const tsSettings = {
    module: "amd",
    target: "es5",
    preserveConstEnums: true,
    declaration: !!outputDeclarationFile
};

let tsProject;

const tsconfigPath = `${sourcePath}/tsconfig.json`;

if(fs.existsSync(tsconfigPath)){
    const existingTsConfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    const newSettings = Object.assign({}, existingTsConfig.compilerOptions, tsSettings);
    tsProject = ts.createProject(newSettings);
} else {
    tsProject = ts.createProject(tsSettings);
}

// TypeScript compile in the source directory
gulp.task("ts-build", () => {
    // Reset the failed compile flag to support subsequent watch mode builds
    // that may have fixed the initial error
    tsCompileFailed = false;
    let errorCount = 0;

    console.log(`Building project ${libraryId}`);
    console.log(`Starting TypeScript ${tsVersion} compile...`);
    buildStartTime = new Date();

    // Make sure to clear out the object that was used to store TypeScript output
    tsOutput = {};

    // Only create the ouput dir if the user hasn't specified an output file
    // If the've specifed an output file we will use that instead
    if (!outputFile) {
        mkdirp(outputPath);
    }

    const tsResult = gulp.src(`${sourcePath}/**/*.{ts,tsx}`)
        .pipe(tsProject())
        .on("error", () => {
            errorCount++;
            tsCompileFailed = true;
        })
        .on("finish", () => {
            // The finish event is fired after TS compile completes
            if (tsCompileFailed) {
                console.error(gutil.colors.red(`TypeScript compile failed with ${errorCount} errors`));

                if (!isWatchMode) {
                    // Make sure to exit with error code if TypeScript compile failed so that we 
                    // stop the build pipeline.
                    // This also stops the bundleFiles function from continuing to bundle broken build output
                    process.exit(1);
                }
            }
        });

    const streams = [tsResult.js.pipe(processTypescriptOutput())];

    if (outputDeclarationFile) {
        // Store references to any triple slash TS declaration file reference
        const foundReferences = {};
        const dtsStream = tsResult.dts
            .pipe(processsDeclarationFiles(foundReferences, namespace))
            .pipe(concat(path.basename(outputDeclarationFile)))
            .pipe(addDeclarationReferences(foundReferences))
            .pipe(gulp.dest(path.dirname(outputDeclarationFile)));

        streams.push(dtsStream);
    }

    return merge(streams);
});

// Build the .ts files and then make a bundle file
gulp.task("bundle-modules", ["ts-build"], bundleFiles);

// Watch mode allows us to watch for changes to the source files,
// and trigger a build if they change in any way (add, modify, delete)
gulp.task("watch", ["bundle-modules"], () => {
    // Watch all files in the source directory for changes
    // Run the 'bundle-modules' task when we detect a change
    const watcher = gulp.watch(
        [path.join(sourcePath, "/**/*")],
        ["bundle-modules"]);

    // Let the developer know what changed and that we are currently running a build
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running build...');
    });
});

// Default Gulp task is to build and bundle the modules
gulp.task('default', ["bundle-modules"]);
