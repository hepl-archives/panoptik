"use strict";

var $ = require( "jquery" ),
    Hello = require( "./test.js" );

$( function() {

    console.log( "Hey mon ami, t'aimes-tu ça les patates ?" );

    Hello.hello();

} );
