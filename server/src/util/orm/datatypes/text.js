const AbstractDataType = require('./abstractdatatype');

class TextDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    return 'TEXT';
  }

}

module.exports = TextDataType;