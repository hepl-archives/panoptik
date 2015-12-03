/* panoptik
 * /bin/models/widget.js - model for Widgets
 * started @ 02/11/2015
 */

"use strict";

/*
    column
    row
    type
    data
*/

var jsonDB = require( "../core/json-db" );

var Widget;

module.exports = Widget = function( oData ) {
    var _oData = {
            "id": null,
            "column": null,
            "row": null,
            "type": null,
            "data": null,
            "userId": null,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        _save,
        _delete,
        sProperty;

    if( oData ) {
        for( sProperty in oData ) {
            if( {}.hasOwnProperty.call( oData, sProperty ) ) {
                if( [ "createdAt", "updatedAt" ].indexOf( sProperty ) > -1 ) {
                    _oData[ sProperty ] = new Date( oData[ sProperty ] );
                } else {
                    _oData[ sProperty ] = oData[ sProperty ];
                }
            }
        }
    }

    _save = function( fNext ) {
        jsonDB.save( "widget", _oData.id, _oData, function( oError, oSavedWidget ) {
            if( oError ) {
                return fNext( oError );
            }
            if( !_oData.id ) {
                _oData.id = oSavedWidget.id;
            }
            _oData.updatedAt = oSavedWidget.updatedAt;
            fNext( null );
        } );
    };

    _delete = function( fNext ) {
        jsonDB.delete( "widget", _oData.id, fNext );
    };

    return {
        // properties
            // id
        get "id"() {
            return _oData.id;
        },
            // column
        get "column"() {
            return _oData.column;
        },
        set "column"( iValue ) {
            _oData.column = iValue;
        },
            // row
        get "row"() {
            return _oData.row;
        },
        set "row"( iValue ) {
            _oData.row = iValue;
        },
            // type
        get "type"() {
            return _oData.type;
        },
        set "type"( sValue ) {
            _oData.type = sValue;
        },
            // data
        get "data"() {
            return _oData.data;
        },
        set "data"( oValue ) {
            _oData.data = oValue;
        },
            // userId
        get "userId"() {
            return _oData.userId;
        },
        set "userId"( iValue ) {
            _oData.userId = iValue;
        },
            // createdAt
        get "createdAt"() {
            return _oData.createdAt;
        },
            // updatedAt
        get "updatedAt"() {
            return _oData.updatedAt;
        },
        // methods
        "save": _save,
        "delete": _delete
    };

};

Widget.getById = function( iID, fNext ) {
    Widget.getOne( { "id": iID }, fNext );
};

Widget.getOne = function( oWhereClause, fNext ) {
    jsonDB.get( "widget", oWhereClause, function( oError, oRawWidget ) {
        if( oError ) {
            return fNext( oError );
        }
        fNext( null, new Widget( oRawWidget ) );
    } );
};

Widget.getAll = function( oWhereClause, fNext ) {
    jsonDB.getAll( "widget", oWhereClause, function( oError, aRawWidgets ) {
        if( oError ) {
            return fNext( oError );
        }
        fNext( null, aRawWidgets.map( function( oRawWidget ) {
            return new Widget( oRawWidget );
        } ) );
    } );
};
