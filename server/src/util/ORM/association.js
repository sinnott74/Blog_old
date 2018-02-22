/**
 * Association mixins for Model
 */
const ORM = require('./orm');
const Model = require('./model');
const Util = require('./util');
const DataTypes = require('./datatypes');

/**
 *
 * @param {Model} model
 */
Model.oneToOne = function(model, options) {
  const source = this;
  const target = model;
  options = {...options};
  const name = options.as ? options.as : source.name;

  model.associations[name] = {
    type: 'OneToOne',
    source,
    target,
    options,
  }

  // Add ID & foreign reference
  addModelReference(target, source);

  // Add target accessor method
  let sourceName = options.as ? options.as : source.name;
  Util.defineGetterAndSetter(target, sourceName);

  if(options.bidirectional){
    addModelReference(source, target);
  }
}

/**
 * Creates a 1:m association between this (the source) and the provided target. The foreign key is added on the target.
 *
 * @param {Model}               model
 * @example
 * User.hasMany(Profile) // This will add userId to the profile table
 */
Model.oneToMany = function(model, options) {
  const source = this;
  const target = model;
  options = {...options};
  const name = options.as ? options.as : source.name;

  model.associations[name] = {
    type: 'OneToMany',
    source,
    target,
    options,
  }

  // Add ID & foreign reference
  addModelReference(target, source);

  // Add target accessor method
  let sourceName = options.as ? options.as : source.name;
  Util.defineGetterAndSetter(target, sourceName);
}

/**
 *
 * @param {Model} model
 */
Model.manyToMany = function(model, options) {
  const source = this;
  const target = model;
  options = {...options};
  const name = options.as ? options.as : source.name;
  const throughName = options.through || source.name + target.name;
  const through = getThroughModel(throughName);

  model.associations[name] = {
    type: 'ManyToMany',
    source,
    target,
    through,
    options,
  }

  // Add ID & foreign reference
  addModelReference(through, target);
  addModelReference(through, source);
}

/**
   * Adds an foreign reference to the table of modelReferencing, referencing the table of modelBeingReferenced
   * @param {*} modelReferencing
   * @param {*} modelBeingReferenced
   */
function addModelReference(modelReferencing, modelBeingReferenced) {
  let referenceAttribute = {};
  let referenceAttributeName = `${modelBeingReferenced.name}_id`;
  referenceAttribute[referenceAttributeName] = {
    type: DataTypes.INT,
    notNull: true,
    autoIncrement: true,
    _autoGenerated: true,
    references: {
      table: modelBeingReferenced.name,
      column: 'id'
    }
  }
  modelReferencing.rawAttributes = {
    ...modelReferencing.rawAttributes,
    ...referenceAttribute
  }

  Util.defineGetterAndSetter(modelReferencing, referenceAttributeName);
  modelReferencing.refreshAttributes();
}

/**
 * Name of the Model which the Many to Many association goes through
 * @param {String} through
 */
function getThroughModel(through) {
  if(!ORM.isDefined(through)){
    ORM.define(through, {});
  }
  return ORM.getModel(through);
}