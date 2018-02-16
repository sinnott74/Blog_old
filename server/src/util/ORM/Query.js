const TransactionInfo = require('../../core/TransactionInfo');

/**
 * Responsible for interacting with the Database.
 */
class Query {

  /**
   * Executes a given query in the currently running transaction.
   *
   * @param {Object|String}           query Object containing paramaterised SQL & parameter, or an SQL string to execute
   * @param {String}                  [query.text] The paramaterised SQL query to execute
   * @param {Array<String>}           [query.values] Values to be submitted with a paramatarised query
   * @returns {Promise<Array<Object>>} Resulting rows from the query
   */
  async _executeSQLQuery(sqlQuery){
    console.log(sqlQuery);
    let transaction = TransactionInfo.get('transaction');
    let result = await transaction.query(sqlQuery);
    return result.rows;
  }

  /**
   * Converts an object with attributes which are dot notation named to nest objects
   * @param {*} obj
   * @example
   * {
   *  user_id: 1,
   *  username: 'test@test.com',
   *  address.id: 1,
   *  address.line1: '123 fake st',
   *  address.planet: 'Earth'
   * }
   *
   * is converted to:
   *
   * {
   *  user_id: 1,
   *  username: 'test@test.com',
   *  address: {
   *    id: 1
   *    line1: '123 fake st',
   *    planet: 'Earth'
   *  }
   * }
   */
  static convertDotNotationToObject(obj) {
    obj = {
      ...obj
    };
    for (var key in obj) {
      if (key.indexOf('.') !== -1) {
        // this._parseDotNotation(obj, key, obj[key]);
        let value = obj[key];
        let currentObj = obj;
        let keys = key.split('.');
        let keysLength = Math.max(1, keys.length - 1);
        let localKey, i;

        for (i = 0; i < keysLength; ++i) {
          localKey = keys[i];
          currentObj[localKey] = currentObj[localKey] || {};
          currentObj = currentObj[localKey];
        }
        currentObj[keys[i]] = value;
        delete obj[key];

      }
    }
    return obj;
  }

  /**
   * Gets the column associated with the given attributeName.
   *
   * @param {array<Model>} models Array of models to check for the given column
   * @param {string} attributeName name of a model attribute
   * @returns {Column}
   *
   * @throws Error if no attribute not found
   * @throws Error if multiple columns match the attribute name
   */
  _getMatchingColumn(models, attributeName){
    // ID should only reference the ID of the initial model, not the association
    if(attributeName === 'id'){
      return models[0].entity[attributeName];
    }

    let matches = [];
    models.forEach((model) => {
      // Check each column of each model
      model.sqlConfig.columns.forEach((column) => {
        if(column.name === attributeName){
          matches.push(model.entity[attributeName]);
        }
      });
    });

    // No matches found
    if(matches.length === 0) {
      throw new Error(`No attribute match found for ${attributeName}`);
    }

    // Multiple matches found
    if(matches.length > 1) {
      let matchOutput = '';
      matches.forEach((match, index) => {
        if(index !== 0) {
          matchOutput += ', ';
        }
        matchOutput += `${match.table._schema}.${match.table._name}.${match.name}`;
      });
      throw new Error(`Multiple attribute matches found for ${attributeName} - ${matchOutput}`);
    }

    return matches[0];
  }

  /**
   * Builds a select SQL query object
   * @param {Model}           model    Model on which this query is being initially executed
   * @param {Object}          attributes   Attributes used in the select query
   * @param {Object}          options       Options used in this query creation
   * @param {Object}          [options.includes] associations to include in the query
   */
  _buildSelectSQLQuery(model, attributes, options) {

    let queryBuilder = model.entity;

    // select
    queryBuilder = queryBuilder.select(model.entity.star())
    options.includes.forEach((include) => {
      let association = model.associations[include];
      let source = association.source;
      queryBuilder = queryBuilder.select(source.entity.star({prefix: `${include}.`}));
    });

    // from
    let fromClause = model.entity;
    options.includes.forEach((include) => {
      let association = model.associations[include];
      let source = association.source;
      fromClause = fromClause.joinTo(source.entity);
    });
    queryBuilder = queryBuilder.from(fromClause);

    // where
    let sources = options.includes.map((include) => {
      let association =  model.associations[include];
      return association.source;
    });
    let models = [model, ...sources];
    Object.keys(attributes).forEach((attributeName) => {
      let attribute = this._getMatchingColumn(models, attributeName);
      let attributeValue = attributes[attributeName];
      queryBuilder.where(attribute.equals(attributeValue));
    });

    return queryBuilder.toQuery();
  }

  /**
   * Executes a Select Query.
   *
   * @param {Model}                 model           Initial model on which this query is executed.
   * @param {object}                attributes     Attributes used in the where clause
   * @param {object}                options        Query options
   * @param {Array<string>}         options.includes   Array of association names
   */
  async select(model, attributes, options) {
    const sqlQuery = this._buildSelectSQLQuery(model, attributes, options);
    return this._executeSQLQuery(sqlQuery);
  }

  /**
   * Executes an SQl query to create a table if it doesn't exist
   * @param {Model} model
   * @return an Instance of Query to be executed
   * @see Model
   */
  async createTableIfNotExists(model) {
    const sqlQuery = model.entity.create().ifNotExists().toQuery();
    return this._executeSQLQuery(sqlQuery);
  }

  /**
   * Executes an SQL query to create an instance of an entity
   * @param {Model} model
   * @param {*} attributes
   * @returns the rows created
   * @see Model
   */
  async create(model, attributes) {
    const sqlQuery = model.entity.insert(attributes).returning(model.entity.star()).toQuery();
    return this._executeSQLQuery(sqlQuery);
  }

  /**
   * Counts the number of rows.
   *
   * @param {Model} model
   * @param {Object} attributes
   * @return {Number} the count
   */
  async count(model, attributes) {
    const kCOUNT = 'count';
    const sqlQuery = model.entity.select(model.entity.count().as(kCOUNT)).where(attributes).toQuery();
    let rows = await this._executeSQLQuery(sqlQuery);
    return parseInt(rows[0][kCOUNT]);
  }

  /**
   * Performs an SQL modification
   * @param {Model} model
   * @param {Number} id ID of the entity
   * @param {Object} attributes
   */
  async modify(model, id, attributes) {
    let sqlQuery = model.entity.update(attributes).where({id: attributes.id}).returning(model.entity.star()).toQuery();
    return this._executeSQLQuery(sqlQuery);
  }

   /**
   * Performs an SQL modification
   * @param {Model} model
   * @param {Number} id ID of the entity
   * @param {Object} attributes
   */
  async delete(model, id) {
    let sqlQuery = model.entity.delete().where({id: id}).toQuery();
    return this._executeSQLQuery(sqlQuery);
  }
}

module.exports = new Query();

