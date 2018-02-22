/**
 * Start Express server.
 */
let Models = require('./src/Entity');
let ORM = require('./src/util/orm');

ORM.sync()
.then(() => {
  console.log('Database successfully built');
})