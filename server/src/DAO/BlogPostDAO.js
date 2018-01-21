'use strict';
var DAO = require('./DAO');
let blogPostConfig = require('../data/definition/BlogPost');

/**
 * UsersDAO control all data access to the users table.
 * @class
 * @extends {DAO}
 * @inheritdoc
 */
class BlogPostDAO extends DAO {

  /**
   * Get the entity definition
   * @returns { object } configuration object
   */
  get entityConfig() {
    return blogPostConfig;
  }

/**
  * Validates that the given user object is validate
  * @paramater {object} representing a user
  * @throws {TypeError} if the given user is invalid
  */
  async validate(blogpost) {
    if(!blogpost) {
      throw new TypeError('Blogpost object invalid');
    }
  }
}

module.exports = BlogPostDAO;