/* panoptik
 * /bin/controllers/pages/dev.js - dev page controller
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares" ).json;

module.exports = function( oRequest, oResponse ) {
    jsonMiddlewares.send( oRequest, oResponse, "hello, world!" );
};
