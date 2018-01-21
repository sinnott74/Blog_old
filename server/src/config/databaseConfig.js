var cfApp = require('cfenv').getAppEnv();
var services = cfApp.getServices('postgresql') || {};
var dbConfig = services['ElephantSQL-nx'] || {};
var credentials = dbConfig.credentials || {};
var uri = credentials.uri || '';


// Database connection object
module.exports = {

  development: {
    database: 'pwadb',
    host: 'localhost',
    port: 5432,
    max: 5
  },

  production: {
    connectionString: uri,
    max: 5
  }
};