const als = require('async-local-storage');
const database = require('../core/database');
const uuidV4 = require('uuid/v4');

als.enable();

class TransactionInfo {
  /**
   * Reads a transaction scoped object.
   */
  static get(key) {
    return als.get(key);
  };

  /**
   * Sets a transaction scoped object.
   */
  static set(key, object) {
    als.set(key, object);
  };

  static async startTransaction(cb) {
    const client = await database.connect();
    let result = await client.query('BEGIN');
    let transactionID = uuidV4();
    console.log(transactionID);
    TransactionInfo.set('transactionID',transactionID); // Add transactionID for async logging
    TransactionInfo.set('transaction', client); // Add knex transaction object
    await cb();
  }

  static async transactionSuccess(){
    let client = TransactionInfo.get('transaction')
    await client.query('COMMIT');
    await client.release();
    console.log('client released');
  }

  static async transactionFailure(){
    let client = TransactionInfo.get('transaction')
    await client.query('ROLLBACK');
    await client.release();
    console.log('client released');
  }

  static async preMiddleware(req, res, next){
    TransactionInfo.startTransaction(next)
  };

  static async successMiddleware(req, res, next){
    await TransactionInfo.transactionSuccess();
    next();
  }

  static async errorMiddleware(err, req, res, next) {
    console.log(err);
    await TransactionInfo.transactionFailure();
    next(err);
  }
}

module.exports = TransactionInfo;