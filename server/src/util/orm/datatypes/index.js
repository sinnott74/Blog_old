const INT = require('./int');
const STRING = require('./string');
const TEXT = require('./text');
const TIMESTAMP = require('./timestamp');
const BOOLEAN = require('./boolean');

const dataTypes = {

  BOOLEAN: BOOLEAN,
  INT: INT,
  STRING: STRING,
  TEXT: TEXT,
  TIMESTAMP: TIMESTAMP
}

module.exports = dataTypes;