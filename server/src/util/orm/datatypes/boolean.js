const AbstractDataType = require('./abstractdatatype');

class BooleanDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return "boolean";
  }
}

module.exports = BooleanDataType;