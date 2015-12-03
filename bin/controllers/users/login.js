/* panoptik
 * /bin/controllers/users/login.js - log user to API
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    zouti = require( "zouti" ),
    User = require( "../../models/user.js" );

module.exports = function( oRequest, oResponse ) {

    // get post params
    var sLogin = ( oRequest.body.login || "" ).trim(),
        sPassword = ( oRequest.body.password || "" ).trim(),
        oWhereClause;

    // verify post params
    if( !sLogin.trim() || !sPassword.trim() ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_EMPTY_PARAMS" ), 400 );
    }

    oWhereClause = {
        "login": sLogin,
        "password": zouti.whirlpool( sPassword )
    };

    User.getOne( oWhereClause, function( oError, oUser ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        oUser.token = zouti.sha256( oUser.id + "-" + oUser.updatedAt.getTime() );
        oUser.save();
        jsonMiddlewares.send( oRequest, oResponse, {
            "id": oUser.id,
            "token": oUser.token
        } );
    } );
};
