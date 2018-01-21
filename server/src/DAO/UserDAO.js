'use strict';
let DAO = require('./DAO');
let bcrypt = require('bcryptjs');
let userConfig = require('../data/definition/User');
let RecordNotFoundException = require('..//util/exception/RecordNotFoundException');

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
  async preCreate(user) {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.dob = new Date();
  }

  /**
   * Checks if a a username is available
   * @param {String} userName
   * @returns {boolean} true if the username is avilable, false otherwise.
   */
  async isUserNameAvailable(userName) {
    let query = this.entity.where({username: userName}).toQuery();
    let result = await this.transaction.query(query);

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
  async readByUserName(userName) {
    let query = this.entity.where({username: userName}).toQuery();
    let result = await this.transaction.query(query);

    if(result.rows.length === 1) {
      throw new RecordNotFoundException();
    }
    return entityArray[0];
  }
}

module.exports = UserDAO;