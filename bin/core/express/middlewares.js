/* panoptik
 * /bin/core/express/middlewares.js - global middleware configuration
 * started @ 23/10/2015
 */

"use strict";

var User = require( "../../models/user.js" );

var _json;

exports.log = function( oRequest, oResponse, fNext ) {
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

exports.checkConnect = function( oRequest, oResponse, fNext ) {
    var iUserID = +oRequest.headers[ "app-id" ],
        sUserToken = oRequest.headers[ "app-token" ];

    // check db
    User.getById( iUserID, function( oError, oUser ) {
        if( oUser && oUser.token === sUserToken ) {
            oResponse.locals.user = oUser;
            fNext();
        } else {
            return _json.error( oRequest, oResponse, oError || new Error( "INVALID_TOKEN" ), oError ? 404 : 401 );
        }
    } );
};
