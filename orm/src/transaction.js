const als = require("./threadlocal");
const uuidV4 = require("uuid/v4");
const onFinished = require("on-finished");

als.enable();

class TransactionInfo {
  /**
   * Reads a transaction scoped object.
   */
  static get(key) {
    return als.get(key);
  }

  /**
   * Sets a transaction scoped object.
   */
  static set(key, object) {
    als.set(key, object);
  }

  static async startTransaction(database, cb) {
    let client = await database.connect();
    await client.query("BEGIN");
    let transactionID = uuidV4();
    console.log(transactionID);
    TransactionInfo.set("transactionID", transactionID); // Add transactionID for async logging
    TransactionInfo.set("transaction", client); // Add knex transaction object
    await cb();
  }

  static async startTransactionMiddle(database, req, res, next) {
    let client = await database.connect();
    await client.query("BEGIN");
    let transactionID = uuidV4();
    // console.log(client.processID, "ProcessID", transactionID, "transactionID");
    TransactionInfo.set("transactionID", transactionID); // Add transactionID for async logging
    TransactionInfo.set("transaction", client); // Add knex transaction object

    onFinished(res, async (err, res) => {
      if (err || (res.statusCode && res.statusCode >= 400)) {
        await TransactionInfo._rollback(client, transactionID);
      } else {
        await TransactionInfo._commit(client, transactionID);
      }
    });

    await next();
  }

  static async _commit(client, transactionID) {
    await client.query("COMMIT");
    await client.release();
    // console.log(
    //   client.processID,
    //   "ProcessID",
    //   transactionID,
    //   "transactionID",
    //   "Transaction Successful - client released"
    // );
  }

  static async _rollback(client, transactionID) {
    await client.query("ROLLBACK");
    await client.release();
    // console.error(
    //   client.processID,
    //   "ProcessID",
    //   transactionID,
    //   "transactionID",
    //   "Transaction Failed - client released"
    // );
  }

  static async transactionSuccess() {
    const client = TransactionInfo.get("transaction");
    const transactionID = TransactionInfo.get("transactionID");
    await TransactionInfo._commit(client, transactionID);
  }

  static async transactionFailure() {
    const client = TransactionInfo.get("transaction");
    const transactionID = TransactionInfo.get("transactionID");
    await TransactionInfo._rollback(client, transactionID);
  }
}

module.exports = TransactionInfo;
