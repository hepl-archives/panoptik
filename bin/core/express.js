/* panoptik
 * /bin/core/express.js - express setup
 * started @ 23/10/2015
 */

"use strict";

var express = require( "express" ),
    bodyParser = require( "body-parser" );

var oApp;

oApp = express();

// configure middlewares
    // body-parser
oApp.use( bodyParser.json() );
oApp.use( bodyParser.urlencoded( {
    "extended": true
} ) );
    // logging
oApp.use( require( "./express/middlewares" ).log );

// configure static
oApp.use( express.static( __dirname + "/../../static" ) );

// configure engine
oApp.set( "view engine", "jade" );
oApp.set( "views", __dirname + "/../views" );

// configure routes
require( "../routes/users.js" ).init( oApp );
// require( "../routes/widgets.js" ).init( oApp );
require( "../routes/pages.js" ).init( oApp );

// listen
oApp.listen( 12345 );
