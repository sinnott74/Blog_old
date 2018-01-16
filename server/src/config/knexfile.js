'use strict';

var cfApp = require('cfenv').getAppEnv();
var services = cfApp.getServices('postgresql') || {};
var dbConfig = services['ElephantSQL-nx'] || {};
var credentials = dbConfig.credentials || {};
var uri = credentials.uri || '';

// Database connection object
module.exports = {

  development: {
    client: 'pg',
    connection: {
      username: 'postgres',
      database: 'pwadb',
      host: 'localhost'
    },
    pool: {
      min: 2,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../data/migrations'
    },
    seeds: {
      directory: '../data/seeds'
    }// ,
    // debug: true
  },

  production: {
    client: 'pg',
    connection: uri,
    pool: {
      min: 2,
      max: 4
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../data/migrations'
    },
    seeds: {
      directory: '../data/seeds'
    }
  }
};
