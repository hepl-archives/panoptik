"use strict";

module.exports = function( grunt ) {

    grunt.loadNpmTasks( "grunt-eslint" );

    grunt.initConfig( {
        "eslint": {
            "server": [ "bin/**/*.js" ]
        }
    } );

    grunt.registerTask( "default", [
        "eslint"
    ] );

};
