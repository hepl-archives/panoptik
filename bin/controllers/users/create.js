/* panoptik
 * /bin/controllers/users/create.js - create a user
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    User = require( "../../models/user.js" );

// [POST] - /users
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        oUser = new User();

    oUser.login = ( oPOST.login || "" ).trim();
    oUser.password = ( oPOST.password || "" ).trim();
    oUser.pseudo = ( oPOST.pseudo || "" ).trim();

    oUser.save( function( oError ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        jsonMiddlewares.send( oRequest, oResponse, {
            "id": oUser.id,
            "pseudo": oUser.pseudo,
            "avatar": oUser.avatar
        } );
    } );

};
