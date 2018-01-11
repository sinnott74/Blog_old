'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var routes = require('./src/routes');

/**
 * Create Express server.
 */
var expressApp = express();

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
 * use compression
 */
expressApp.use(compression());

// // log all paths
// expressApp.use(function(req, res, next) {
//   console.log(req.path);
//   next();
// });

// Data API routes
expressApp.use('/api', routes);

// Define static assets path - i.e. styles, scripts etc.
expressApp.use('/', express.static(path.join(__dirname, '../webclient/dist')));


expressApp.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../webclient/dist/index.html'));
});

/**
 * Start Express server.
 */
var serverController = {};
serverController.startServer = function(port) {
  // As a failsafe use port 0 if the input isn't defined
  // this will result in a random port being assigned
  // See : https://nodejs.org/api/http.html for details
  if (typeof port === 'undefined' ||
      port === null ||
      isNaN(parseInt(port, 10))) {
    port = 8081;
  }

  var server = expressApp.listen(port, () => {
    var serverPort = server.address().port;
    console.log('Server running on port ' + serverPort);
  });
};

serverController.startServer(process.env.port);
