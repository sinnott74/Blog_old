const AbstractAssociation = require('./AbstractAssociation');
const ORM = require('../ORM');

class ManyToMany extends AbstractAssociation {

  /**
   *
   * @param {Model} source
   * @param {Model} target
   * @param {Object} options
   * @param {String} options.through The name of the many to many intermediary model
   */
  constructor(source, target, options) {
    super(source, target, options);

    if(!this.options.through){
      throw new Error('Many to Many Association requires a "through" option');
    }
    this.type = "ManyToMany";
    this.through = this._getThroughModel();
    this._addForeignKeyConstraints();
  }

  /**
   * Gets the Model specified in the 'through' options. Creates the models if it doesn't already exist.
   * @returns intermediary Model which facilitates this Many to Many association.
   */
  _getThroughModel() {
    const throughModelName = this.options.through;
    if(!ORM.isDefined(throughModelName)){
      ORM.define(throughModelName, {});
    }
    return ORM.getModel(throughModelName);
  }

  /**
   * Injects the foreign key reference attributes onto the target model
   */
  _addForeignKeyConstraints() {
    super._addForeignKeyConstraints();
    this._addReferenceID(this.source, this.through);
    this._addReferenceID(this.target, this.through);
  }
}

module.exports = ManyToMany;