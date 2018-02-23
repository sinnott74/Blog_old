/**
 * Start Express server.
 */
const Models = require('./src/Entity');
const databaseConfig = require('./src/config/databaseConfig');
const ORM = require('sinnott-orm');

const mode = process.env.NODE_ENV || 'development';
const dbConfig = databaseConfig[mode]

ORM.sync(dbConfig)
.then(() => {
  console.log('Database successfully built');
})