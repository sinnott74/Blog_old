'use strict';
let DAO = require('./DAO');
let bcrypt = require('bcryptjs');
let userConfig = require('../data/definition/User');
let credentialConfig = require('../data/definition/Credential');
let RecordNotFoundException = require('..//util/exception/RecordNotFoundException');
let MultipleRecordsFoundException = require('..//util/exception/RecordNotFoundException');
let Sql = require('sql');

/**
 * UsersDAO control all data access to the users table.
 * @class
 * @extends {DAO}
 * @inheritdoc
 */
class UserDAO extends DAO {

  /**
   * Get the entity definition
   * @returns { object } configuration object
   */
  get entityConfig() {
    return userConfig;
  }

 /**
  * Validates that the given user object is validate
  * @paramater {object} representing a user
  * @throws {TypeError} if the given user is invalid
  */
  async validate(user) {
    if(!user) {
      throw new TypeError('User object invalid');
    }
  }

/**
 * Hook point called before the creation of the user on the database.
 * Hashes a user's password.
 * @param {*} user
 */
  async preInsert(user) {
  }

  async postInsert(user) {
  }

  /**
   * Checks if a a username is available
   * @param {String} userName
   * @returns {boolean} true if the username is avilable, false otherwise.
   */
  async isUserNameAvailable(userName) {
    let result = this._searchByUserName(userName);
    if(result.rows.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Read user table by username
   * @param {String} userName
   * @returns {User} true if the username is avilable, false otherwise.
   */
  async readByUserName(username) {
    let result = await this._searchByUserName(username);
    if(result.rows.length === 0) {
      throw new RecordNotFoundException();
    }
    if (result.rows.length > 1) {
      throw new MultipleRecordsFoundException(`Multiple Records Found on ${this.entityName} with ID ${id}`);
    }
    return result.rows[0];
  }

  /**
   * Searches for a user based on username
   * @param {*} username
   * return {Promise} to an array of Users
   */
  async _searchByUserName(username) {
    let query = this.entity.where({username: username}).toQuery();
    return await this.transaction.query(query);
  }
}

module.exports = UserDAO;