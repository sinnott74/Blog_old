'use strict';
let DAO = require('./DAO');
let UserDAO = require('./UserDAO');
let bcrypt = require('bcryptjs');
let credentialConfig = require('../data/definition/Credential');
let userConfig = require('../data/definition/User');
let RecordNotFoundException = require('..//util/exception/RecordNotFoundException');
let MultipleRecordsFoundException = require('..//util/exception/RecordNotFoundException');
let Sql = require('sql');

/**
 * CredentialDAO control all data access to the Credential table.
 * @class
 * @extends {DAO}
 * @inheritdoc
 */
class CredentialDAO extends DAO {

  constructor(){
    super();
    this.user = Sql.define(userConfig);
  }

  /**
   * Get the entity definition
   * @returns { object } configuration object
   */
  get entityConfig() {
    return credentialConfig;
  }

 /**
  * Validates that the given user object is validate
  * @paramater {object} representing a user
  * @throws {TypeError} if the given user is invalid
  */
  async validate(credential) {
    if(!credential) {
      throw new TypeError('Credential object invalid');
    }
  }

/**
 * Hook point called before the creation of the user on the database.
 * Hashes a user's password.
 * @param {*} user
 */
  async preInsert(credential) {
    await this.deactivePreviousCredential(credential);

    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(credential.password, salt);
    credential.password = hash;
    credential.active = true;
    credential.created_on = new Date();
  }

  /**
   * Deactivates a user's active password
   */
  async deactivePreviousCredential(credential){
    let previousCredential = await this.searchActiveUserCredentialByUserID(credential.user_id);
    if(previousCredential){
      previousCredential.active = false;
      this.modify(previousCredential);
    }
  }

  /**
   * Reads active credential by username
   * @param {*} username
   */
  async readActiveUserCredentialByUsername(username) {
    let query = await this.entity
                        .from(this.entity.join(this.user).on(this.entity.user_id.equals(this.user.id)))
                        .where({active: true}).and(this.user.username.equals(username)).toQuery();
    console.log(query);
    let result = await this.transaction.query(query)

    if(result.rows.length === 0) {
      throw new RecordNotFoundException();
    }
    if (result.rows.length > 1) {
      throw new MultipleRecordsFoundException(`Multiple Active Records Found on ${this.entityName} with ID ${id}`);
    }
    return result.rows[0];
  }

  /**
   * Reads active credential by user ID. May return null
   * @param {*} user_id
   */
  async searchActiveUserCredentialByUserID(user_id) {
    let query = await this.entity.where({active: true, user_id: user_id}).toQuery();
    let result = await this.transaction.query(query)

    if (result.rows.length > 1) {
      throw new MultipleRecordsFoundException(`Multiple Active Records Found on ${this.entityName} with ID ${id}`);
    }
    return result.rows[0];
  }

  /**
   * Checks if a username & passward match
   * @param {*} username
   * @param {*} password
   * @return {Promise} which resolves to true
   *   if the username/password combination are authentic,
   *   false otherwise
   */
  async authenticate(username, password) {
    let userCredential = await this.readActiveUserCredentialByUsername(username);
    return bcrypt.compare(password, userCredential.password);
  }
}

module.exports = CredentialDAO;