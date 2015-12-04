"use strict";

module.exports = function( grunt ) {

    grunt.loadNpmTasks( "grunt-eslint" );
    grunt.loadNpmTasks( "grunt-browserify" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-supervisor" );
    grunt.loadNpmTasks( "grunt-concurrent" );

    grunt.initConfig( {
        "browserify": {
            "modules": {
                "files": {
                    "./static/js/bundle.js": [ "./static/js/modules/scripts.js" ]
                }
            }
        },
        "concurrent": {
            "workflow": [ 'supervisor', 'watch' ],
            "options": {
                "logConcurrentOutput": true
            }
        },
        "eslint": {
            "server": [
                "bin/**/*.js",
                "static/js/modules/**/*.js"
            ]
        },
        "supervisor": {
            "server": {
                "script": "bin/server.js",
                "options": {
                    "watch": [ "bin" ],
                }
            }
        },
        "uglify": {
            "modules": {
                "options": {
                    "report": "gzip",
                    "sourceMap": true
                },
                "files": {
                    "./static/js/bundle.min.js": [ "./static/js/bundle.js" ]
                }
            }
        },
        "watch": {
            "modules": {
                "files": [ "./static/js/modules/**/*.js" ],
                "tasks": [ "build" ]
            }
        }
    } );

    grunt.registerTask( "default", [
        "eslint",
        "build"
    ] );

    grunt.registerTask( "build", [
        "browserify",
        "uglify"
    ] );

    grunt.registerTask( "work", [
        "eslint",
        "build",
        "concurrent"
    ] );

};
