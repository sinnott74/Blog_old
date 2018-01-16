'use strict';
/**
 * This module is repsonsible for creating & configuring an instance of knex.
 * Knex will be used to interact with the database.
 */
var knexConfig = require('../config/knexfile.js'); // require knex configuration object
var mode = process.env.NODE_ENV || 'development'; // Set our mode, falling back to development if not provided.
var dbConfig = knexConfig[mode];
module.exports = require('knex')(dbConfig);