/* panoptik
 * /bin/controllers/widgets/details.js - get widgets details (from connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../models/widget.js" );

// [GET] - /widgets/:id
module.exports = function( oRequest, oResponse ) {

    var iWidgetID = +oRequest.params.id;

    if( isNaN( iWidgetID ) ) {
        return jsonMiddlewares.error( oRequest, oResponse, new Error( "NO_VALID_ID" ), 400 );
    }

    Widget.getById( iWidgetID, function( oError, oWidget ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        if( oWidget.userId !== oResponse.locals.user.id ) {
            return jsonMiddlewares.error( oRequest, oResponse, new Error( "FORBIDDEN_WIDGET" ), 401 );
        }
        jsonMiddlewares.send( oRequest, oResponse, {
            "id": oWidget.id,
            "type": oWidget.type,
            "column": oWidget.column,
            "row": oWidget.row,
            "data": oWidget.data
        } );
    } );
};
