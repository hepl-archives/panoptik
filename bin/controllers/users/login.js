/* panoptik
 * /bin/controllers/users/login.js - log user to API
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    zouti = require( "zouti" );

module.exports = function( oRequest, oResponse ) {

    // get post params
    var sLogin = oRequest.body.login || "",
        sPassword = oRequest.body.password || "";

    // verify post params
    if( !sLogin.trim() || !sPassword.trim() ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_EMPTY_PARAMS" ), 400 );
    }

    // TODO: check in db
    var oUser = {
        "id": 1,
        "login": "leny",
        "password": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
        "last_connexion": new Date()
    };

    // generate token
    var sToken = zouti.sha256( oUser.id + "-" + oUser.last_connexion.getTime() );

    // returns
    jsonMiddlewares.send( oRequest, oResponse, {
        "id": oUser.id,
        "token": sToken
    } );

};
