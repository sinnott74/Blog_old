class AbstractDataType {

  constructor() {
    if (this.constructor === AbstractDataType) {
      throw new Error('This Class should not be instantiated, please extend');
    }
  }

  static getSQLType(attributeOptions) {
    throw new Error('get postgresType must be implemented');
  }
}

module.exports = AbstractDataType;