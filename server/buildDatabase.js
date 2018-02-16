/**
 * Start Express server.
 */
let Models = require('./src/Entity');
let ORM = require('./src/util/ORM/ORM');

ORM.sync()
.then(() => {
  console.log('Database successfully built');
})