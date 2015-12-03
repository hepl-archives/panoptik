/* panoptik
 * /bin/routes/widgets.js - routes configuration for widgets
 * started @ 23/10/2015
 */

"use strict";

var fCheckConnect = require( "../core/express/middlewares.js" ).checkConnect;

exports.init = function( oApp ) {

    // get all widgets (require connexion)
    oApp.get( "/widgets", fCheckConnect, require( "../controllers/widgets/list.js" ) );

    // get one widget details (require connexion)
    oApp.get( "/widgets/:id", fCheckConnect, require( "../controllers/widgets/details.js" ) );

    // create widget (require connexion)
    oApp.post( "/widgets", fCheckConnect, require( "../controllers/widgets/create.js" ) );

    // update widget infos (require connexion)
    oApp.put( "/widgets/:id", fCheckConnect, require( "../controllers/widgets/update.js" ) );

    // delete widget (require connexion)
    oApp.delete( "/widgets/:id", fCheckConnect, require( "../controllers/widgets/delete.js" ) );

};
