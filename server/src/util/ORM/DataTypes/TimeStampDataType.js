const AbstractDataType = require('./AbstractDataType');

class TimeStampDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return 'TIMESTAMPZ';
  }

}

module.exports = TimeStampDataType;