const Model = require('./Model');
const DataTypes = require('./DataTypes');
const ModelManager = require('./ModelManager');
const TransactionInfo = require('../../core/TransactionInfo');

/**
 *
 */
class ORM {

  constructor() {
    this.modelManager = ModelManager;
  }

  /**
   * Define a new model, representing a table in the DB.
   *
   * The table columns are defined by the object that is given as the second argument. Each key of the object represents a column
   *
   * @param {String} modelName The name of the model. The model will be stored in `sequelize.models` under this name
   * @param {Object} attributes An object, where each attribute is a column of the table. See {@link Model.init}
   * @param {Object} [options] These options are merged with the default define options
   *
   * @see <a href="../manual/tutorial/models-definition.html">The manual section about defining models</a>
   * @see {@link DataType} For a list of possible data types
   *
   * @return {Model}
   *
   * @example
   * ORM.define('modelName', {
   *     columnA: {
   *         type: DataType.BOOLEAN,
   *         validate: {
   *           is: ["[a-z]",'i'],        // will only allow letters
   *           max: 23,                  // only allow values <= 23
   *           isIn: {
   *             args: [['en', 'zh']],
   *             msg: "Must be English or Chinese"
   *           }
   *         },
   *         field: 'column_a'
   *         // Other attributes here
   *     },
   *     columnB: DataType.STRING,
   *     columnC: 'MY VERY OWN COLUMN TYPE'
   * })
   *
   * sequelize.models.modelName // The model will now be available in models under the name given to define
   */
  define(modelName, attributes, options) {

    if (!modelName) {
      throw new Error('Model name required');
    }

    if(this.modelManager.isDefined(modelName)){
      throw new Error(`Model ${modelName} has alread been defined`);
    }

    attributes = {
      ...attributes
    };
    options = {
      ...options,
      modelName: modelName,
      ORM: this
    }

    let ModelClass = class extends Model {};
    ModelClass.init(attributes, options);

    this.modelManager.addModel(ModelClass);
    return ModelClass;
  }

  /**
   * Checks if a model has previously be defined
   * @param {String} model Name of the model to check if its defined
   * @returns {Boolean} true if the model has been defined, false otherwise
   */
  isDefined(model) {
    return this.modelManager.isDefined(model);
  }

  /**
   * Gets a model which has previously be defined
   * @param {String} model Name of the model
   * @returns {Model}
   */
  getModel(model) {
    return this.modelManager.getModel(model);
  }


  /**
   * Creates a database table for each model.
   */
  async sync() {
    const models = this.modelManager.getModels();
    TransactionInfo.startTransaction(async function() {
      try {
        models.forEach(async (model) => {
          await model.sync();
        })
        await TransactionInfo.transactionSuccess();
      } catch(err) {
        console.log(err);
        await TransactionInfo.transactionFailure();
      }
    });
  }
}

module.exports = new ORM();