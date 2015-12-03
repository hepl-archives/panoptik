/* panoptik
 * /bin/controllers/widgets/create.js - create widget (for connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../models/widget.js" );

// [POST] - /widgets
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        oWidget = new Widget();

    oWidget.column = oPOST.column;
    oWidget.row = oPOST.row;
    oWidget.type = oPOST.type;
    oWidget.data = JSON.parse( oPOST.data ) || {}; // TODO: probable changes here.
    oWidget.userId = oResponse.locals.user.id;

    oWidget.save( function( oError, oSavedWidget ) {
        if( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        }
        jsonMiddlewares.send( oRequest, oResponse, {
            "id": oSavedWidget.id,
            "type": oSavedWidget.type,
            "column": oSavedWidget.column,
            "row": oSavedWidget.row,
            "data": oSavedWidget.data
        } );
    } );
};
