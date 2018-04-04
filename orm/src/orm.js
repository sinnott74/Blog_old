// Exporting before requiring Model as theres a circular relationship
module.exports = ORM;
const ModelClass = require("./model");
const DataTypes = require("./datatypes");
const ModelManager = require("./modelmanager");
const Transaction = require("./transaction");
const pg = require("pg");
const Util = require("./util");

function ORM() {}

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
 *   columnA: {
 *       type: DataType.BOOLEAN,
 *       validate: {
 *         is: ["[a-z]",'i'],        // will only allow letters
 *         max: 23,                  // only allow values <= 23
 *         isIn: {
 *           args: [['en', 'zh']],
 *           msg: "Must be English or Chinese"
 *         }
 *       },
 *       field: 'column_a'
 *       // Other attributes here
 *   },
 *   columnB: DataType.STRING,
 *   columnC: 'MY VERY OWN COLUMN TYPE'
 * })
 *
 * sequelize.models.modelName // The model will now be available in models under the name given to define
 */
ORM.define = function(modelName, attributes, options) {
  if (!modelName) {
    throw new Error("Model name required");
  }

  if (ModelManager.isDefined(modelName)) {
    throw new Error(`Model ${modelName} has alread been defined`);
  }

  attributes = {
    ...attributes
  };
  options = {
    ...options,
    modelName: modelName,
    ORM: this
  };

  let Model = class extends ModelClass {};
  Model.init(attributes, options);

  ModelManager.addModel(Model);
  return Model;
};

/**
 * Checks if a model has previously be defined
 * @param {String} model Name of the model to check if its defined
 * @returns {Boolean} true if the model has been defined, false otherwise
 */
ORM.isDefined = function(model) {
  return ModelManager.isDefined(model);
};

/**
 * Gets a model which has previously be defined
 * @param {String} model Name of the model
 * @returns {Model}
 */
ORM.getModel = function(model) {
  return ModelManager.getModel(model);
};

/**
 * Exposing datatypes on ORM
 */
ORM.DataTypes = DataTypes;

/**
 * Creates a database table for each model.
 */
ORM.sync = async function(config) {
  const pool = createDBPool(config);
  const models = ModelManager.getModels();
  await Transaction.startTransaction(pool, async function() {
    try {
      await Util.asyncForEach(models, async model => {
        await model.sync();
      });
      await Transaction.transactionSuccess();
    } catch (err) {
      console.log(err);
      await Transaction.transactionFailure();
    }
  });
  await pool.end();
};

/**
 * Express Middleware
 */
ORM.init = function(config) {
  const pool = createDBPool(config);
  return async function(req, res, next) {
    await Transaction.startTransactionMiddle(pool, req, res, next);
  };
};

function createDBPool(dbConfig) {
  const pool = new pg.Pool(dbConfig);
  pool.on("error", Transaction.transactionFailure);
  return pool;
}
