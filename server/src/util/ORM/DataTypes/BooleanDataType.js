const AbstractDataType = require('./AbstractDataType');

class BooleanDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return "boolean";
  }
}

module.exports = BooleanDataType;