'use strict';
/**
 * This module is repsonsible for creating & configuring an instance of a Postgreg Pool.
 */
var pg = require('pg');
var databaseConfig = require('../config/databaseConfig');
var mode = process.env.NODE_ENV || 'development';
var config = databaseConfig[mode];
let pool = new pg.Pool(config);
module.exports = pool;