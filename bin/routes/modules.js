/* panoptik
 * /bin/routes/modules.js - routes configuration for modules
 * started @ 23/10/2015
 */

"use strict";

var fCheckConnect = require( "../core/express/middlewares.js" ).checkConnect;

exports.init = function( oApp ) {

    // get all modules (require connexion)
    // oApp.get( "/modules", fCheckConnect, require( "../controllers/modules/list.js" ) );

    // get one module details (require connexion)
    // oApp.get( "/modules/:id", fCheckConnect, require( "../controllers/modules/details.js" ) );

    // create module (require connexion)
    // oApp.post( "/modules", fCheckConnect, require( "../controllers/modules/create.js" ) );

    // update modules infos (require connexion)
    // oApp.put( "/modules/:id", fCheckConnect, require( "../controllers/modules/update.js" ) );

    // delete module (require connexion)
    // oApp[ "delete" ]( "/modules/:id", fCheckConnect, require( "../controllers/modules/delete.js" ) );

};
