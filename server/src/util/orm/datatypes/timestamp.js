const AbstractDataType = require('./abstractdatatype');

class TimeStampDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return 'TIMESTAMPZ';
  }

}

module.exports = TimeStampDataType;