/* panoptik
 * /bin/controllers/widgets/update.js - update widget (for connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../core/sequelize.js" ).models.Widget;

// [PUT] - /widgets/:id
module.exports = function( oRequest, oResponse ) {

    var oPOST = oRequest.body,
        iWidgetID = +oRequest.params.id,
        iColumn, iRow, oData;

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

                if( ( iColumn = oPOST.column ) != null ) {
                    oWidget.column = +iColumn;
                }
                if( ( iRow = oPOST.row ) != null ) {
                    oWidget.row = +iRow;
                }
                if( oPOST.data && ( oData = JSON.parse( oPOST.data ) ) ) {
                    oWidget.data = oData;
                }

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
            }
        } );

};
