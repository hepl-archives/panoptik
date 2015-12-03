/* panoptik
 * /bin/controllers/widgets/update.js - update widget (for connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../models/widget.js" );

// [delete] - /widgets/:id
module.exports = function( oRequest, oResponse ) {

    var iWidgetID = +oRequest.params.id;

    Widget.getById( iWidgetID, function( oError, oWidget ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        if( oWidget.userId !== oResponse.locals.user.id ) {
            return jsonMiddlewares.error( oRequest, oResponse, new Error( "FORBIDDEN_WIDGET" ), 401 );
        }
        oWidget.delete( function( oError ) {
            if( oError ) {
                return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
            }
            jsonMiddlewares.send( oRequest, oResponse, true );
        } );
    } );
};
