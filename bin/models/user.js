/* panoptik
 * /bin/models/users.js - model for Users
 * started @ 02/11/2015
 */

"use strict";

var jsonDB = require( "../core/json-db" );

var User;

module.exports = User = function( oData ) {
    var _oData = {
            "id": null,
            "login": "",
            "password": "",
            "pseudo": "",
            "token": null,
            "avatar": null,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        sProperty,
        _save,
        _delete;

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
        jsonDB.save( "user", _oData.id, _oData, function( oError, oSavedUser ) {
            if( oError ) {
                return fNext && fNext( oError );
            }
            if( !_oData.id ) {
                _oData.id = oSavedUser.id;
            }
            _oData.updatedAt = oSavedUser.updatedAt;
            fNext && fNext( null );
        } );
    };

    _delete = function( fNext ) {
        jsonDB.delete( "user", _oData.id, fNext );
    };

    return {
        // properties
            // id
        get "id"() {
            return _oData.id;
        },
            // login
        get "login"() {
            return _oData.login;
        },
        set "login"( sValue ) {
            _oData.login = sValue;
        },
            // password
        get "password"() {
            return _oData.password;
        },
        set "password"( sValue ) {
            _oData.password = require( "zouti" ).whirlpool( sValue );
        },
            // pseudo
        get "pseudo"() {
            return _oData.pseudo;
        },
        set "pseudo"( sValue ) {
            _oData.pseudo = sValue;
        },
            // token
        get "token"() {
            return _oData.token;
        },
        set "token"( sValue ) {
            _oData.token = sValue;
        },
            // avatar
        get "avatar"() {
            return _oData.avatar || "http://api.adorable.io/avatars/80/" + _oData.login + ".png";
        },
        set "avatar"( sValue ) {
            _oData.avatar = sValue;
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

User.getById = function( iID, fNext ) {
    User.getOne( { "id": iID }, fNext );
};

User.getOne = function( oWhereClause, fNext ) {
    jsonDB.get( "user", oWhereClause, function( oError, oRawUser ) {
        if( oError ) {
            return fNext( oError );
        }
        fNext( null, new User( oRawUser ) );
    } );
};
