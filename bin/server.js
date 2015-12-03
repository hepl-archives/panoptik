/* panoptik
 * /bin/server.js - main entry point
 * started @ 23/10/2015
 */

"use strict";

var zouti = require( "zouti" );

zouti.clearConsole();
zouti.log( "launching...", "panoptik:server", zouti.YELLOW );

zouti.bench( "panoptik:server" );

// load & configure all
require( "./core/express.js" );

zouti.bench( "panoptik:server" );
