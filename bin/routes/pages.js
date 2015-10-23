/* panoptik
 * /bin/routes/pages.js - routes configuration for pages
 * started @ 23/10/2015
 */

"use strict";

exports.init = function( oApp ) {

    oApp.get( "/dev", require( "../controllers/pages/dev.js" ) );
    // oApp.all( "/", require( "../controllers/pages/home.js" ) );

};
