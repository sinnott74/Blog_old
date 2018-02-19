var cfApp = require('cfenv').getAppEnv();
var services = cfApp.getServices('postgresql') || {};
// ElephantSQL-nx prod, ElephantSQL-cy staging
var dbConfig = services['ElephantSQL-nx'] || services['ElephantSQL-cy'] || {};
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