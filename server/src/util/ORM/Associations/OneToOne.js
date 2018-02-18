const AbstractAssociation = require('./AbstractAssociation');

class OneToOne extends AbstractAssociation {

  constructor(source, target, options) {
    super(source, target, options);
    this.type = "OneToOne";

    this._addForeignKeyConstraints();
  }

  /**
   * Injects the foreign key reference attributes onto the target model.
   *
   * if option.bidirectional, a reference will also be added to the source model.
   */
  _addForeignKeyConstraints() {
    super._addForeignKeyConstraints();
    this._addReferenceID(this.source, this.target);

    if(this.options.bidirectional){
      this._addReferenceID(this.target, this.source);
    }
  }

  buildQuery(query) {
    super.buildQuery();
  }
}

module.exports = OneToOne;