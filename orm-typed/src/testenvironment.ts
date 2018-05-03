// my-custom-environment
const NodeEnvironment = require("jest-environment-node");
import Transaction, { createPGPool } from "./transaction";

const config = {
  database: "pwadb",
  host: "localhost",
  port: 5432,
  max: 1
};

class TransactionalTestEnvironment extends (NodeEnvironment as {
  new (config: any): any;
}) {
  transaction: Transaction;
  itSet: boolean;
  constructor(config: any) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.pool = createPGPool(config);
    this.global.transaction = await Transaction.begin(this.pool);
  }

  async teardown() {
    await this.global.transaction.rollback();
    await this.pool.end();
    await super.teardown();
  }

  runScript(script: any) {
    return super.runScript(script);
  }
}

module.exports = TransactionalTestEnvironment;
