/* panoptik
 * /bin/controllers/widgets/update.js - update widget (for connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../core/sequelize.js" ).models.Widget;

// [delete] - /widgets/:id
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        iWidgetID = +oRequest.params.id;

    Widget
        .findById( iWidgetID )
        .catch( function( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        } )
        .then( function( oWidget ) {
            if( oWidget ) {
                if( oWidget.user_id !== oResponse.locals.user.id ) {
                    return jsonMiddlewares.error( oRequest, oResponse, new Error( "FORBIDDEN_WIDGET" ), 401 );
                }

                oWidget
                    .destroy()
                    .then( function() {
                        return jsonMiddlewares.send( oRequest, oResponse, true );
                    } );
            }
        } );

};
