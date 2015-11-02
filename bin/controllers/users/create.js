/* panoptik
 * /bin/controllers/users/create.js - create a user
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    User = require( "../../core/sequelize.js" ).models.User;

// [POST] - /users
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        oUser = User.build();

    oUser.login = ( oPOST.login || "" ).trim();
    oUser.password = ( oPOST.password || "" ).trim();
    oUser.pseudo = ( oPOST.pseudo || "" ).trim();

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
