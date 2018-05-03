/**
 * Module dependencies.
 */
import server from "./core/server";

/**
 * Start Express server.
 */
const port = process.env.PORT || 8080;
const serverInstance = server.listen(port, () => {
  const serverPort = serverInstance.address().port;
  console.log("Server running on port " + serverPort);
});
