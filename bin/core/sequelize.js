/* panoptik
 * /bin/core/sequelize.js - sequelize setup
 * started @ 02/11/2015
 */

"use strict";

var fs = require( "fs" ),
    Sequelize = require( "sequelize" );

var oSequelize, oModels;

// connexion
exports.db = oSequelize = new Sequelize( "panoptik", "panoptik", "panoptik", {
    "host": "postgres",
    "dialect": "postgres"
} );

// models
exports.models = oModels = {
    "User": oSequelize.import( "../models/user.js" ),
    "Widget": oSequelize.import( "../models/widget.js" )
};

// relations
oModels.Widget.belongsTo( oModels.User );
