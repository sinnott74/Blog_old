/**
 * Module dependencies.
 */
import path from "path";
import express from "express";
import helmet from "helmet";
const cfenv: any = require("cfenv"); // cloud foundry environment variables
import forceHttpsMiddleware from "../middleware/forceHttps";
import compression from "compression";
import bodyParser from "body-parser";
import Auth from "./Auth";
import { Request, Response } from "express";
import "./orm";

/**
 * Adds Sync support to express routers & needs to be above import of routes
 */
require("express-async-errors");
import routes from "../routes";

/**
 * Create Express server.
 */
const server = express();

/**
 * Force https when not localhost
 */
if (!cfenv.getAppEnv().isLocal) {
  server.use(forceHttpsMiddleware);
}

/**
 * Use helmet for security
 */
server.use(helmet());

/**
 * Body parser
 */
server.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
server.use(bodyParser.json()); // parse application/json

/**
 * Express Validator.
 * Must be set directly after body parser
 */
//server.use(expressValidator());

// prevents express setting x-powered-by header
server.disable("x-powered-by");

/**
 * Initialize passport
 */
server.use(Auth.initialize());

/**
 * use compression
 */
server.use(compression());

// Define static assets path - i.e. styles, scripts etc.
server.use(
  "/",
  express.static(path.join(__dirname, "../../../webclient/build"), {
    maxAge: "1y",
    setHeaders: setCustomCacheControl
  })
);

// Data API routes
server.use("/api", routes);

server.get("/*", function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "../../../webclient/build/index.html"));
});

/**
 * Set custom Cache-Control header for Index.html
 */
function setCustomCacheControl(res: Response, path: string) {
  if (path.endsWith("index.html") || path.endsWith("service-worker.js")) {
    res.setHeader("Cache-Control", "public, max-age=0");
  }
}

export default server;
