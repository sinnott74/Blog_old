var cfApp = require("cfenv").getAppEnv();

if (process.env.NODE_ENV === "production") {
  // Production
  module.exports = {
    connectionString: cfApp.getServices("postgresql")["ElephantSQL"].credentials
      .uri,
    max: 5
  };
} else {
  // Development
  module.exports = {
    database: "pwadb",
    host: "localhost",
    port: 5432,
    max: 5
  };
}
