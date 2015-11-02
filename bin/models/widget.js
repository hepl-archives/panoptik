/* panoptik
 * /bin/models/widget.js - sequelize model for Widgets
 * started @ 02/11/2015
 */

"use strict";

module.exports = function( oSequelize, DataTypes ) {

    var oColumns, oProperties;

    oColumns = {
        "column": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "default": 0
        },
        "row": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "default": 0
        },
        "type": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "data": {
            "type": DataTypes.JSON,
            "default": {}
        }
    };

    oProperties = {
        "tablename": "widgets",
        "paranoid": true,
        "underscored": true
    };

    return oSequelize.define( "Widget", oColumns, oProperties );

};
