/* panoptik
 * /bin/routes/users.js - routes configuration for users
 * started @ 23/10/2015
 */

"use strict";

var fCheckConnect = require( "../core/express/middlewares.js" ).checkConnect;

exports.init = function( oApp ) {

    // log user
    oApp.post( "/users/login", require( "../controllers/users/login.js" ) );

    // logout user (require connexion)
    oApp.get( "/users/logout", fCheckConnect, require( "../controllers/users/logout.js" ) );

    // get one user details (require connexion)
    oApp.get( "/users/:id", fCheckConnect, require( "../controllers/users/details.js" ) );

    // update user infos (require connexion)
    oApp.put( "/users/:id", fCheckConnect, require( "../controllers/users/update.js" ) );

    // create user
    oApp.post( "/users", require( "../controllers/users/create.js" ) );

};
