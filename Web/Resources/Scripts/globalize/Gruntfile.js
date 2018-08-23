module.exports = function (grunt) {
    var GlobalizeDir = "node_modules/globalize";
    var CldrDir = "node_modules/cldrjs";
    var CldrDataDir  = "node_modules/cldr-data";

    // This is the subset of locales that are also supported by Moment.js, so only build data for these ones.
    var locales = ["af", "ar", "ar-MA", "ar-SA", "ar-TN", "az", "be", "bg", "bn", "bo", "br", "bs", "ca", "cs", "cy", "da", "de", "de-AT", "el", "en", "en-AU", "en-CA", "en-GB", "eo", "es", "et", "eu", "fa", "fi", "fo", "fr", "fr-CA", "fy", "gl", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "ka", "km", "ko", "lb", "lt", "lv", "mk", "ml", "mr", "ms", "my", "nb", "ne", "nl", "nn", "pl", "pt", "ro", "ru", "si", "sk", "sl", "sq", "sr", "sr-Cyrl", "sv", "ta", "th", "tr", "tzm", "tzm-Latn", "uk", "uz", "vi", "zh"];

    var config = {
        "merge-json": {},
        "cldr-simplify": {
            src: "locale/*.json"
        },
        "uglify": {
            options: {
                screwIE8: true
            },
            cldr: {
                files: {
                    "cldr.min.js": [
                        CldrDir + "/dist/cldr.js",
                        CldrDir + "/dist/cldr/event.js",
                        CldrDir + "/dist/cldr/supplemental.js",
                    ]
                }
            },
            globalize: {
                files: {
                    "globalize.min.js": [
                        GlobalizeDir + "/dist/globalize.js",
                        GlobalizeDir + "/dist/globalize/number.js",
                        GlobalizeDir + "/dist/globalize/currency.js",
                    ]
                }
            }
        }
    };

    // Configure a "merge-json" task for each locale.
    locales.forEach(function (locale) {
        config["merge-json"][locale] = {
            src: [
                CldrDataDir + "/supplemental/likelySubtags.json",
                CldrDataDir + "/supplemental/numberingSystems.json",
                CldrDataDir + "/supplemental/currencyData.json",
                CldrDataDir + "/main/" + locale + "/currencies.json",
                CldrDataDir + "/main/" + locale + "/numbers.json"
            ],
            dest: "locale/" + locale + ".json"
        };
    });

    // Configure another "merge-json" task that creates an "all-locales.json" file from the output of the above.
    config["merge-json"]["all-locales"] = {
        src: ["locale/*.json", "!all-locales.json"],
        dest: "locale/all-locales.json"
    };

    grunt.initConfig(config);
    grunt.loadNpmTasks("grunt-merge-json");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerMultiTask("cldr-simplify", "Simplifies CLDR JSON files by eliminating unneeded data.", function () {
        this.files.forEach(function (file) {
            file.src.forEach(function (srcFile) {
                grunt.log.writeln("Optimizing CLDR file " + srcFile);
                var cldrData = grunt.file.readJSON(srcFile);

                // Strip currency region information.
                cldrData.supplemental.currencyData.region = {};
                
                var numberingSystems = {};

                for (var locale in cldrData.main) {
                    // Keep track of useful numbering systems for later.
                    numberingSystems[cldrData.main[locale].numbers.defaultNumberingSystem] = true;
                    if (cldrData.main[locale].numbers.otherNumberingSystems) {
                        for (var key in cldrData.main[locale].numbers.otherNumberingSystems) {
                            numberingSystems[cldrData.main[locale].numbers.otherNumberingSystems[key]] = true;
                        }
                    }

                    // Remove full names of currencies (e.g. "United States Dollar", "Japanese Yen", etc.). We only care about symbols.
                    for (var currency in cldrData.main[locale].numbers.currencies) {
                        for (var key in cldrData.main[locale].numbers.currencies[currency]) {
                            if (key.indexOf("displayName") === 0) {
                                delete cldrData.main[locale].numbers.currencies[currency][key];
                            }
                        }
                    }

                    // Remove "long" and "short" decimal format (e.g. "10 thousand", "100K", etc.).
                    for (var key in cldrData.main[locale].numbers) {
                        if (key.indexOf("decimalFormats-") === 0) {
                            delete cldrData.main[locale].numbers[key].short;
                            delete cldrData.main[locale].numbers[key].long;
                        }
                    }
                }

                // Remove unneeded numbering systems.
                for (var numberingSystem in cldrData.supplemental.numberingSystems) {
                    if (!numberingSystems[numberingSystem]) {
                        delete cldrData.supplemental.numberingSystems[numberingSystem];
                    }
                }

                // Remove subtags that are irrelevant for the chosen locale(s).
                for (var subtag in cldrData.supplemental.likelySubtags) {
                    var matchesLocale = false;
                    for (var locale in cldrData.main) {
                        if (getLanguage(subtag) === getLanguage(locale)) {
                            // It's relevant to one of our locales, so keep it.
                            matchesLocale = true;
                            break;
                        }
                    }

                    if (!matchesLocale) {
                        delete cldrData.supplemental.likelySubtags[subtag];
                    }
                }

                grunt.file.write(srcFile, JSON.stringify(cldrData));
            });
        });
    });

    grunt.registerTask("globalize-with-locales", "Creates a copy of Globalize that has all locale data pre-loaded.", function () {
        var globalizeScript = grunt.file.read("globalize.min.js");
        var localeData = grunt.file.read("locale/all-locales.json");
        globalizeScript += "Globalize.load(" + localeData + ");";
        grunt.file.write("globalize-with-locales.min.js", globalizeScript);
    });

    grunt.registerTask("default", ["uglify", "merge-json", "cldr-simplify", "globalize-with-locales"]);

    function getLanguage(locale) {
        var language = locale.toLowerCase();
        if (language.indexOf("-") > 0) {
            language = language.slice(0, language.indexOf("-"));
        }

        return language;
    }
};