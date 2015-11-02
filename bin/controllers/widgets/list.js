/* panoptik
 * /bin/controllers/widgets/list.js - get all widgets (from connected user)
 * started @ 02/11/2015
 */

"use strict";

var jsonMiddlewares = require( "../../core/express/middlewares.js" ).json,
    Widget = require( "../../core/sequelize.js" ).models.Widget;

// [GET] - /widgets
module.exports = function( oRequest, oResponse ) {

    Widget
        .findAll( {
            "where": {
                "user_id": oResponse.locals.user.id
            },
            "order": [
                [ "column", "ASC" ],
                [ "row", "ASC" ]
            ]
        } )
        .catch( function( oError ) {
            return jsonMiddlewares.error( oRequest, oResponse, oError, 500 );
        } )
        .then( function( aWidgets ) {
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
