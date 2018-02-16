const AbstractAssociation = require('./AbstractAssociation');

class OneToMany extends AbstractAssociation {

  /**
   * Creates a 1:m association between this (the source) and the provided target. The foreign key is added on the target.
   *
   * @param {Model}               source
   * @param {Model}               target
   * @param {object}              [options]
   * @param {boolean}             [options.hooks=false] Set to true to run before-/afterDestroy hooks when an associated model is deleted because of a cascade. For example if `User.hasOne(Profile, {onDelete: 'cascade', hooks:true})`, the before-/afterDestroy hooks for profile will be called when a user is deleted. Otherwise the profile will be deleted without invoking any hooks
   * @param {string|object}       [options.as] The alias of this model. If you provide a string, it should be plural, and will be singularized using node.inflection. If you want to control the singular version yourself, provide an object with `plural` and `singular` keys. See also the `name` option passed to `sequelize.define`. If you create multiple associations between the same tables, you should provide an alias to be able to distinguish between them. If you provide an alias when creating the association, you should provide the same alias when eager loading and when getting associated models. Defaults to the pluralized name of target
   * @param {string|object}       [options.foreignKey] The name of the foreign key in the target table or an object representing the type definition for the foreign column (see `Sequelize.define` for syntax). When using an object, you can add a `name` property to set the name of the column. Defaults to the name of source + primary key of source
   * @param {string}              [options.sourceKey] The name of the field to use as the key for the association in the source table. Defaults to the primary key of the source table
   * @param {object}              [options.scope] A key/value set that will be used for association create and find defaults on the target. (sqlite not supported for N:M)
   * @param {string}              [options.onDelete='SET&nbsp;NULL|CASCADE'] SET NULL if foreignKey allows nulls, CASCADE if otherwise
   * @param {string}              [options.onUpdate='CASCADE']
   * @param {boolean}             [options.constraints=true] Should on update and on delete constraints be enabled on the foreign key.
   * @example
   * User.hasMany(Profile) // This will add userId to the profile table
   */
  constructor(source, target, options) {
    super(source, target, options);
    this.type = "OneToMany";

    this._addForeignKeyConstraints();
    this._injectTargetAccessorMethods();
    this._injectSourceAccessorMethods();
  }

  /**
   * Injects the foreign key reference attributes onto the target model
   */
  _addForeignKeyConstraints() {
    this._addReferenceID(this.source, this.target);
  }

  /**
   *
   */
  _injectTargetAccessorMethods() {

    let sourceModelName = this.source.name;
    let sourceName = this.options.as ? this.options.as : sourceModelName;
    let sourceModel = this.source;

    Object.defineProperty(this.target.prototype, sourceName, {
      get: function() {
        return this.get(sourceName);
      },
      set: function() {
        this.set(sourceName);
      }
    })
  }

  _injectSourceAccessorMethods() {

  }
}

module.exports = OneToMany;