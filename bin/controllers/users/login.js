/* panoptik
 * /bin/controllers/users/login.js - log user to API
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    zouti = require( "zouti" ),
    User = require( "../../core/sequelize.js" ).models.User;

module.exports = function( oRequest, oResponse ) {

    // get post params
    var sLogin = ( oRequest.body.login || "" ).trim(),
        sPassword = ( oRequest.body.password || "" ).trim();

    // verify post params
    if( !sLogin.trim() || !sPassword.trim() ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_EMPTY_PARAMS" ), 400 );
    }

    User
        .findOne( {
            "where": {
                "login": sLogin,
                "password": zouti.whirlpool( sPassword )
            }
        } )
        .catch( function( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        } )
        .then( function( oUser ) {
            if( !oUser ) {
                return jsonMiddlewares.error( oRequest, oResponse, new Error( "UNKNOWN_USER" ), 404 );
            }

            oUser.token = zouti.sha256( oUser.id + "-" + oUser.updated_at.getTime() );
            oUser.save();
            jsonMiddlewares.send( oRequest, oResponse, {
                "id": oUser.id,
                "token": oUser.token
            } );
        } );
};
