const AbstractDataType = require('./abstractdatatype');

class IntDataType extends AbstractDataType {

  static getSQLType(attributeOptions) {

    if(attributeOptions.autoIncrement){
      return 'SERIAL';
    }
    return 'INT';
  }

}

module.exports = IntDataType;