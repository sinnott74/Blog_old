const AbstractDataType = require('./AbstractDataType');

class TextDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return 'TEXT';
  }

}

module.exports = TextDataType;