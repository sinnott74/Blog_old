'use strict';
var DAO = require('./DAO');
let blogPostConfig = require('../data/definition/BlogPost');
let userConfig = require('../data/definition/User');
let RecordNotFoundException = require('../exception/RecordNotFoundException');
let MultipleRecordsFoundException = require('..//exception/RecordNotFoundException');
let Sql = require('sql');

/**
 * UsersDAO control all data access to the users table.
 * @class
 * @extends {DAO}
 * @inheritdoc
 */
class BlogPostDAO extends DAO {

  constructor() {
    super();
    this.user = Sql.define(userConfig);
  }

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

  async getBlogPostDetails(id) {
    let query = await this.entity
                .select(this.entity.star())
                .select(this.user.username)
                .select(this.user.firstname.concat(' ').concat(this.user.lastname).as('author'))
                .from(this.entity.join(this.user)
                .on(this.entity.user_id.equals(this.user.id)))
                .where({id})
                .toQuery();
    let result = await this.transaction.query(query);

    if(result.rows.length === 0) {
      throw new RecordNotFoundException();
    }
    if (result.rows.length > 1) {
      throw new MultipleRecordsFoundException(`Multiple Active Records Found on ${this.entityName} with ID ${id}`);
    }
    return result.rows[0];
  }

  /**
   * Lists all blogs & details associated with each blog. e.g. author etc.
   */
  async listBlogPostDetails() {
    let query = await this.entity
                .select(this.entity.star())
                .select(this.user.username)
                .select(this.user.firstname.concat(' ').concat(this.user.lastname).as('author'))
                .from(this.entity.join(this.user)
                .on(this.entity.user_id.equals(this.user.id)))
                .toQuery();
    let result = await this.transaction.query(query);
    return result.rows;
  }

  /**
   * Hook point called before the creation of the user on the database.
   * Hashes a user's password.
   * @param {*} user
   */
  async preInsert(blogpost) {

    blogpost.created_on = new Date();
  }
}

module.exports = BlogPostDAO;