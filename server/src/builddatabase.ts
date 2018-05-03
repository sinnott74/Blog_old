/**
 * Start Express server.
 */
import Models from "./Entity";
import databaseConfig from "./config/databaseConfig";
import { sync } from "sinnott-orm-typed";

console.log(Models);
sync(databaseConfig).then(() => {
  console.log("Database successfully built");
});
