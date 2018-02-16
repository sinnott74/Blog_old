const AbstractDataType = require('./AbstractDataType');

class StringDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {
    if(attributeOptions.length && attributeOptions.length > 255 ){
      throw new Error('String too long, use TextDataType instead');
    }
    return attributeOptions.length ? `varchar${attributeOptions.length}` : 'varchar';
  }

}

module.exports = StringDataType;