/* panoptik
 * /bin/controllers/users/details.js - get one user details
 * started @ 23/10/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json;

// [GET] - /users/:id
module.exports = function( oRequest, oResponse ) {

    var iUserID = +oRequest.params.id;

    if( isNaN( iUserID ) ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_VALID_ID" ), 400 );
    }

    // get user in db
    var oUser = {
        "pseudo": "Leny",
        "avatar": "images/avatar/12345.png"
    };

    jsonMiddlewares.send( oRequest, oResponse, oUser );

};
