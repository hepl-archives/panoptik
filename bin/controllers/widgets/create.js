/* panoptik
 * /bin/controllers/widgets/create.js - create widget (for connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../core/sequelize.js" ).models.Widget;

// [GET] - /widgets/:id
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        oWidget = Widget.build();

    oWidget.column = oPOST.column;
    oWidget.row = oPOST.row;
    oWidget.type = oPOST.type;
    oWidget.data = JSON.parse( oPOST.data ) || {}; // TODO: probable changes here.

    oWidget
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return jsonMiddlewares.error( oRequest, oResponse, oValidationReport.errors, 400 );
            }

            oWidget
                .save()
                .catch( function( oError ) {
                    return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
                } )
                .then( function( oSavedWidget ) {
                    if( oSavedWidget ) {
                        oSavedWidget.setUser( oResponse.locals.user );
                        jsonMiddlewares.send( oRequest, oResponse, {
                            "id": oSavedWidget.id,
                            "type": oSavedWidget.type,
                            "column": oSavedWidget.column,
                            "row": oSavedWidget.row,
                            "data": oSavedWidget.data
                        } );
                    }
                } );
        } );

};
