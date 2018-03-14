/**
 * Start Express server.
 */
const Models = require("./src/Entity");
const databaseConfig = require("./src/config/databaseConfig");
const ORM = require("sinnott-orm");

ORM.sync(databaseConfig).then(() => {
  console.log("Database successfully built");
});
