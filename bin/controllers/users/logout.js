/* panoptik
 * /bin/controllers/users/login.js - unlog user to API
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json;

module.exports = function( oRequest, oResponse ) {

    var oUser = oResponse.locals.user;

    oUser.token = "";
    oUser.save();
    jsonMiddlewares.send( oRequest, oResponse, true );

};
