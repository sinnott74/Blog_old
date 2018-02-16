const Model = require('./Model')
const toposort = require ('toposort');

/**
 * Responsible for managing all Models created by ORM.
 */
class ModelManager {

  constructor() {
    this.models = {};
  }

  /**
   * Adds a model.
   *
   * see {@link Model}
   *
   * @param {Model}          model A Model
   */
  addModel(model) {
    this.models[model.name] = model;
  }

  /**
   * Removes a model.
   *
   * see {@link Model}
   *
   * @param {Model}          model A Model
   */
  removeModel(model) {
    delete this.models[model.name];
  }

  /**
   * Adds a model.
   *
   * see {@link Model}
   *
   * @param {String}          modelName A Model name
   * @return {Model}
   */
  getModel(modelName) {
    return this.models[modelName];
  }

  /**
   * Checks if a Model has been defined previously
   * see {@link Model}
   *
   * @param {String}          modelName Name of a model
   */
  isDefined(modelName) {
    return !!this.getModel(modelName);
  }


  /**
   * Get a list of all Models, sorted based on model foregin references.
   * @returns A sorted array of Models
   */
  getModels() {
    // toposort the models
    let vertices = this._getModelVerticies();
    let modelNameOrder = toposort(vertices);
    let sortedModels = modelNameOrder.map((modelName) => {
      return this.models[modelName];
    });
    this._addStandaloneModels(sortedModels);
    return sortedModels;
  }


  /**
   * Gets a list of all directed foreign key vertices the model name. E.g. [blogpost -> user]
   * @returns {Array<Array<String, String>>} Array of Vertices of model foreign references
   * @example User.hasMany(BlogPost) & User.hasMany(Credential), returns [[user, blogpost],[user, credential]]
   */
  _getModelVerticies() {
    let vertices = [];
      Object.values(this.models).forEach((model) => {
        Object.values(model.rawAttributes).forEach((attribute) => {
        if(attribute.references){
          vertices.push([attribute.references.table, model.name])
        }
      })
    })
    return vertices;
  }

  /**
   * Adds Models which aren't include in the sorted (by foreign reference) list
   * @param {Array<Model>} sortedModels
   */
  _addStandaloneModels(sortedModels) {
    //Add models which aren't in an foreign key reference
    Object.keys(this.models).forEach((modelName) =>{
      const model = this.models[modelName]
      if(!sortedModels.includes(model)){
        sortedModels.push(model);
      }
    })
  }
}

module.exports = new ModelManager();