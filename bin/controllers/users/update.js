/* panoptik
 * /bin/controllers/users/create.js - update a user
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    User = require( "../../core/sequelize.js" ).models.User;

// [PUT] - /users/:id
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        sPassword, sPseudo, sAvatar,
        oUser = oResponse.locals.user;

    ( sPassword = ( oPOST.password || "" ).trim() ) && ( oUser.password = sPassword );

    ( sPseudo = ( oPOST.pseudo || "" ).trim() ) && ( oUser.pseudo = sPseudo );
    ( sAvatar = ( oPOST.avatar || "" ).trim() ) && ( oUser.avatar = sAvatar );

    oUser
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return jsonMiddlewares.error( oRequest, oResponse, oValidationReport.errors, 400 );
            }

            oUser
                .save()
                .catch( function( oError ) {
                    return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
                } )
                .then( function( oSavedUser ) {
                    oSavedUser && jsonMiddlewares.send( oRequest, oResponse, {
                        "id": oSavedUser.id,
                        "pseudo": oSavedUser.pseudo,
                        "avatar": oSavedUser.avatar
                    } );
                } );
        } );

};
