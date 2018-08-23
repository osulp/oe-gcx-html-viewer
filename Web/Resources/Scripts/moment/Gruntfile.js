module.exports = function (grunt) {
    var config = {
        "uglify": {
            options: {
                screwIE8: true
            },
            moment: {
                files: {
                    "locale/all-locales.js": [
                        "locale/*.js",
                        "!all-locales.js"
                    ]
                }
            }
        }
    };

    grunt.initConfig(config);
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["uglify"]);
};