/**
 * Start Express server.
 */
import Models from "./Entity";
import databaseConfig from "./config/databaseConfig";
import ORM from "sinnott-orm";

ORM.sync(databaseConfig).then(() => {
  console.log("Database successfully built");
});
