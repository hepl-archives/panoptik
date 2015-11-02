/* panoptik
 * /bin/models/users.js - sequelize model for Users
 * started @ 02/11/2015
 */

"use strict";

module.exports = function( oSequelize, DataTypes ) {

    var oColumns, oProperties;

    oColumns = {
        "login": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "unique": true,
            "validate": {
                "len": [ 4, 16 ]
            }
        },
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "validate": {
                "isAlphanumeric": true
            },
            "set": function( sValue ) {
                this.setDataValue( "password", sValue.trim() && require( "zouti" ).whirlpool( sValue ) );
            }
        },
        "pseudo": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "token": {
            "type": DataTypes.STRING
        },
        "avatar": {
            "type": DataTypes.STRING,
            "get": function() {
                return this.getDataValue( "avatar" ) || "http://api.adorable.io/avatars/80/" + this.getDataValue( "login" ) + ".png"
            }
        }
    };

    oProperties = {
        "tablename": "users",
        "paranoid": true,
        "underscored": true
    };

    return oSequelize.define( "User", oColumns, oProperties );

};
