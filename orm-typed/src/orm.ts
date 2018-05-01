import ModelManager from "./modelmanager";
import Transaction, { createPGPool } from "./transaction";
import { PoolConfig } from "pg";
import { IncomingMessage, ServerResponse } from "http";
import { asyncForEach } from "./util";
import metadata from "./metadata";

/************************************************
 *                    Exports                   *
 ************************************************/

export { STRING, BOOLEAN, INT, TEXT, TIMESTAMP } from "./datatypes";
export { default as BaseModel, defineModel } from "./basemodel";
export { Column, DerivedColumn } from "./column";
export { Entity } from "./entity";
export { OneToOne, ManyToOne, ManyToMany } from "./associations";
export { ModelManager };
export { metadata };

/**
 * Creates a database table for each model.
 */
export async function sync(config: PoolConfig) {
  const pool = createPGPool(config);
  metadata.build();
  const models = ModelManager.getModels();
  await Transaction.startTransaction(pool, async () => {
    asyncForEach(models, async model => {
      await model.sync();
    });
  });
  await pool.end();
}

export async function transaction(config: PoolConfig, cb: Function) {
  const pool = createPGPool(config);
  metadata.build();
  await Transaction.startTransaction(pool, cb);
  await pool.end();
}

/**
 * Express Middleware
 */
export function init(config: PoolConfig) {
  metadata.build();
  const pool = createPGPool(config);
  return async function(
    req: IncomingMessage,
    res: ServerResponse,
    next: Function
  ) {
    await Transaction.startResponseManagedTransaction(pool, res, next);
  };
}
