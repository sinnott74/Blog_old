import cfenv from "cfenv";

let config;
if (process.env.NODE_ENV === "production") {
  // Production
  config = {
    connectionString: cfenv.getAppEnv().getServices("postgresql")["ElephantSQL"]
      .credentials.uri,
    max: 5
  };
} else {
  // Development
  config = {
    database: "pwadb",
    host: "localhost",
    port: 5432,
    max: 5
  };
}

export default config;
