/* panoptik
 * /bin/controllers/users/create.js - update a user
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json;

// [PUT] - /users/:id
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        sPassword, sPseudo, sAvatar,
        oUser = oResponse.locals.user;

    ( sPassword = ( oPOST.password || "" ).trim() ) && ( oUser.password = sPassword );

    ( sPseudo = ( oPOST.pseudo || "" ).trim() ) && ( oUser.pseudo = sPseudo );
    ( sAvatar = ( oPOST.avatar || "" ).trim() ) && ( oUser.avatar = sAvatar );

    oUser.save( function( oError, oSavedUser ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        jsonMiddlewares.send( oRequest, oResponse, {
            "id": oSavedUser.id,
            "pseudo": oSavedUser.pseudo,
            "avatar": oSavedUser.avatar
        } );
    } );

};
