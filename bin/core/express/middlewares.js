/* panoptik
 * /bin/core/express/middlewares.js - global middleware configuration
 * started @ 23/10/2015
 */

"use strict";

var User = require( "../../core/sequelize.js" ).models.User

var _log,
    _json,
    _check;

exports.log = _log = function( oRequest, oResponse, fNext ) {
    var sDate = ( new Date() ).toTimeString();
    console.log( "(" + sDate + ") - [" + oRequest.method + "] - " + oRequest.url );
    fNext();
};

exports.json = _json = {
    "send": function( oRequest, oResponse, mData, iStatusCode ) {
        oResponse.status( iStatusCode || 200 ).json( {
            "url": "[" + oRequest.method + "] - " + oRequest.url,
            "error": false,
            "data": mData
        } );
    },
    "error": function( oRequest, oResponse, oError, iStatusCode ) {
        oResponse.status( iStatusCode || 500 ).json( {
            "url": "[" + oRequest.method + "] - " + oRequest.url,
            "error": oError.message || oError,
            "data": null
        } );
    }
};

exports.checkConnect = _check = function( oRequest, oResponse, fNext ) {
    var iUserID = +oRequest.headers[ "app-id" ],
        sUserToken = oRequest.headers[ "app-token" ];

    // check db
    User
        .findById( iUserID )
        .then( function( oUser ) {
            if( oUser && oUser.token === sUserToken ) {
                oResponse.locals.user = oUser;
                fNext();
            } else {
                return _json.error( oRequest, oResponse, new Error( "INVALID_TOKEN" ), 401 );
            }
        } );
};
