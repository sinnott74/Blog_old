const IntDataType = require('./IntDataType');
const StringDataType = require('./StringDataType');
const TextDataType = require('./TextDataType');
const TimeStampDataType = require('./TimeStampDataType');
const BooleanDataType = require('./BooleanDataType');

const DataTypes = {

  BOOLEAN: BooleanDataType,
  INT: IntDataType,
  STRING: StringDataType,
  TEXT: TextDataType,
  TIMESTAMP: TimeStampDataType
}

module.exports = DataTypes;