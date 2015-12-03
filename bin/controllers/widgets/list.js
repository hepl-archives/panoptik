/* panoptik
 * /bin/controllers/widgets/list.js - get all widgets (from connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../models/widget.js" );

// [GET] - /widgets
module.exports = function( oRequest, oResponse ) {

    Widget.getAll( {
        "userId": oResponse.locals.user.id
    }, function( oError, aWidgets ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        jsonMiddlewares.send( oRequest, oResponse, aWidgets.map( function( oWidget ) {
            return {
                "id": oWidget.id,
                "type": oWidget.type,
                "column": oWidget.column,
                "row": oWidget.row,
                "data": oWidget.data
            };
        } ) );
    } );
};
