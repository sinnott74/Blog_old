'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var cfenv = require('cfenv'); // cloud foundry environment variables
var forceHttpsMiddleware = require('./src/middleware/forceHttps');
var compression = require('compression');
var bodyParser = require('body-parser');
var Auth = require('./src/core/Auth');

/**
 * Adds Sync support to express routers
 */
require('express-async-errors');

/**
 * Connect to database.
 */
require('./src/core/database');

/**
 * Create Express server.
 */
var expressApp = express();

/**
 * Force https when not localhost
 */
if (!cfenv.getAppEnv().isLocal) {
  expressApp.use(forceHttpsMiddleware);
}

/**
 * Use helmet for security
 */
expressApp.use(helmet());

/**
 * Body parser
 */
expressApp.use(bodyParser.urlencoded({extended: false})); // application/x-www-form-urlencoded
expressApp.use(bodyParser.json()); // parse application/json

/**
 * Express Validator.
 * Must be set directly after body parser
 */
//expressApp.use(expressValidator());

// prevents express setting x-powered-by header
expressApp.disable('x-powered-by');

/**
 * Initialize passport
 */
expressApp.use(Auth.initialize())

/**
 * use compression
 */
expressApp.use(compression());

// Data API routes
var routes = require('./src/routes');
expressApp.use('/api', routes);

// Define static assets path - i.e. styles, scripts etc.
expressApp.use('/', express.static(path.join(__dirname, '../webclient/build'), {
  maxage: '1y',
  setHeaders: setCustomCacheControl
}));

expressApp.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../webclient/build/index.html'));
});

/**
 * Start Express server.
 */
let port = process.env.PORT || 8080;
let server = expressApp.listen(port, () => {
  let serverPort = server.address().port;
  console.log('Server running on port ' + serverPort);
});

/**
 * Set custom Cache-Control header for Index.html
 */
function setCustomCacheControl (res, path) {
  if(path.endsWith('index.html') || path.endsWith('service-worker.js')) {
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}