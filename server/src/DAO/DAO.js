'use strict';
/**
 * This module is responsible for defining the abstact Class DAO.
 * DAO should be extended by all entity DAOs.
 * This class controls access to the database.
 */

let TransactionInfo = require('../core/TransactionInfo');
let RecordNotFoundException = require('..//util/exception/RecordNotFoundException');
let MultipleRecordsFoundException = require('..//util/exception/RecordNotFoundException');
let Sql = require('sql');

/**
 * Abstract class for all Entity DAOs
 * @class
 * @abstract
 *
 * Sub classes must define:
 *  An attribute entityName which represents the name of the table which the DAO will access.
 *  An method validate(entity) which will validate each entity object.
 */
class DAO {

  /**
   * Constructor for abstract DAO classes.
   * @throws {Error} if called directly
   * @throws {TypeError} if entityName attribute is not set on sub class.
   * @throws {TypeError} if validate function is not defined on sub class.
   * @param {object} Knex instance or Knex transaction object.
   * @private
   */
  constructor() {
    if (this.constructor === DAO) {
      throw new Error('This Class should not be instantiated, please extend');
    }

    if(!this.entityConfig || typeof this.entityConfig !== 'object') {
      throw new TypeError('entityConfig must be set');
    }

    if(!this.entityConfig.name || typeof this.entityConfig.name !== 'string') {
      throw new TypeError('Entity name must be configured');
    }

    if(typeof this.validate !== 'function') {
      throw new TypeError('validate method must be implemented');
    }
    this.transaction = TransactionInfo.get('transaction');
    let transactionID = TransactionInfo.get('transactionID');
    console.log(transactionID);

    if(!this.transaction){
      throw new Error('Transation not initialized');
    }

    this.entity = Sql.define(this.entityConfig);
  }

  get entityName() {
    return this.entityConfig.name;
  }

  /**
   * Reads a entry from this table
   * @param {number} id of an entity
   * @returns {Promise<Object>} A promise which resolves to entity
   */
  async get(id) {
    // validate the ID
    await this.validateID(id);

    let query = this.entity.where({id}).toQuery();
    let result = await this.transaction.query(query);

    if (result.rows.length === 0) {
      throw new RecordNotFoundException(`Record Not Found on ${this.entityName} with ID ${id}`);
    }

    if (result.rows.length > 1) {
      throw new MultipleRecordsFoundException(`Multiple Records Found on ${this.entityName} with ID ${id}`);
    }

    return result.rows[0];
  }

  /**
   * Create a entry on this table
   * @param {object} entity
   * @returns {Promise<Number>} A promise which resolves to an ID of an entity
   */
  async insert(entity) {
    // validate the entity
    await this.validate(entity);
    // call subclasses preCreate implemenation
    await this.preCreate(entity);
    // insert entity onto db
    let query = this.entity.insert(entity).returning(this.entity.star()).toQuery();
    let result = await this.transaction.query(query)

    if (result.rows.length !== 1) {
      throw new Error(this.entityName + ' insertion failed');
    }
    return result.rows[0];
  }

  /**
   * Updates a entry on this table
   * @param {object} entity containing a valid id and the details to update to
   * @returns {Promise}
   */
  async modify(entity) {
    // validate the ID
    await this.validateID(entity.id);
    // call subclasses validate implemenation
    await this.validate(entity);
    // return promise which resolves to nothing

    let query = this.entity.update(entity).where({id : entity.id}).toQuery();
    let result = await this.transaction.query(query);
    console.log(result);
  }

  /**
   * Deletes a entry on this table
   * @param {number} id of the entity to delete
   * @returns {Promise}
   */
  async delete(id) {
    await this.validateID(id);
    let query = this.entity.delete().where({id}).toQuery();
    await this.transaction.query(query);
  }

  /**
   * List all entries on this table
   * @returns {Promise<Array>} A promise which resolves an array of entities
   */
  async list() {
    let query = this.entity.select().toQuery();
    let result = await this.transaction.query(query);
    return result.rows;
  }

  /**
   * Validates that the given parameter is a number
   * @param {number} id of an entity
   * @throws {TypeError} if given id is not a number
   */
  async validateID(id) {
    if(isNaN(id)) {
      throw new TypeError('Invalid ID - ' + id);
    }
  }

  /**
   * Hook point called before creating a record on the database.
   * @param {*} entity
   */
  async preCreate(entity) {
  }
}

module.exports = DAO;