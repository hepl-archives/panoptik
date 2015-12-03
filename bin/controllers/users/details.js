/* panoptik
 * /bin/controllers/users/details.js - get one user details
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    User = require( "../../models/user.js" );

// [GET] - /users/:id
module.exports = function( oRequest, oResponse ) {

    var iUserID = +oRequest.params.id;

    if( isNaN( iUserID ) ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_VALID_ID" ), 400 );
    }

    User.getById( iUserID, function( oError, oUser ) {
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
