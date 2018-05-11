/**
 * Start Express server.
 */
import { init, sync, end } from "sinnott-orm-typed";
import databaseConfig from "./config/databaseConfig";
import "./entity";

init(databaseConfig);

sync()
  .then(end)
  .then(() => {
    console.log("Database successfully built");
  });
