import BaseModel from "./basemodel";
import metadata from "./metadata";
import Attribute from "./attribute";
import { AbstractDataType, INT, getSQLDataType } from "./datatypes";
import "reflect-metadata";

export interface ColumnOptions {
  type?: typeof AbstractDataType;
  notNull?: boolean;
  primaryKey?: boolean;
  length?: number;
  autoIncrement?: boolean;
  unique?: boolean;
}
/**
 * Decorator to define a model column
 * @param options
 */
export function Column(options: ColumnOptions = {}) {
  return function(object: BaseModel, propertyName: string): void {
    defineColumn(<typeof BaseModel>object.constructor, propertyName, options);
  };
}

/**
 * Decorator to define a model's primary key.
 *
 * Similar to a Column but has a type of serial and a primaryKey of true
 * @param options
 */
export function PrimaryColumn(options: ColumnOptions = {}) {
  return function(object: BaseModel, propertyName: string): void {
    // Set SERIAL & PrimaryKey
    options = Object.assign({}, options, {
      type: INT,
      autoIncrement: true,
      primaryKey: true
    });

    defineColumn(<typeof BaseModel>object.constructor, propertyName, options);
  };
}

/**
 * Adds the column getters & setters and creates its metadata
 * @param column
 */
export function defineColumn(
  entity: typeof BaseModel,
  column: string,
  options: ColumnOptions = {}
) {
  const dataType = getDataType(entity, column, options);

  defineDataAttributeGetterAndSetter(entity.prototype, column);

  metadata.addColumn(entity, {
    name: column,
    dataType: dataType,
    primaryKey: options.primaryKey,
    unique: options.unique,
    notNull: options.notNull
  });
}

/**
 * Defines a getter & setter on the given BaseModel with the given key.
 *
 * Getter & setter read & write values to the objects internal dataAttributes.
 *
 * @param object
 * @param key
 */
export function defineDataAttributeGetterAndSetter(
  object: BaseModel,
  key: string
) {
  Object.defineProperty(object, key, {
    get: function() {
      if (this.dataAttributes[key]) {
        return this.dataAttributes[key].value;
      }
    },
    set: function(value) {
      if (this.dataAttributes[key]) {
        this.dataAttributes[key].value = value;
      } else {
        this.dataAttributes[key] = new Attribute(key, value);
      }
    },
    enumerable: true,
    configurable: true
  });
}

/**
 * Gets the types of the column. It may be specified in the options,
 * otherwise we will try to infer it from the typescript metatdata.
 * An error is thrown a type can not be gotten.
 *
 * @param entity
 * @param column
 * @param options
 */
function getDataType(
  entity: typeof BaseModel,
  column: string,
  options: ColumnOptions
) {
  let type = options.type && options.type.getSQLType(options);
  if (!type) {
    const relectedType = getReflectedType(entity, column);
    type = relectedType && getSQLDataType(relectedType);
  }

  if (!type) {
    throw new Error(
      `Column Type on ${
        entity.name
      }.${column} could not be determined. Please specify in column options`
    );
  }
  return type;
}

/**
 * Tries to infer the type based on typescript type.
 *
 * N.B. really only works for number, string & boolean
 *
 * @param entity
 * @param column
 */
function getReflectedType(entity: typeof BaseModel, column: string) {
  const type = Reflect.getMetadata("design:type", entity.prototype, column);
  if (type) {
    return type.name;
  }
}

export interface DerivedColumnOptions {
  get: () => any;
}
/**
 * Decorator which defines a Derived Column
 * @param options
 */
export function DerivedColumn(
  options: DerivedColumnOptions
): PropertyDecorator {
  return function(object, propertyName) {
    // Define the column
    defineDerivedColumn(object, propertyName, options);
  };
}

/**
 * Defines a derived column
 * @param object
 * @param propertyName
 * @param options
 */
export function defineDerivedColumn(
  object: Object,
  propertyName: string | symbol,
  options: DerivedColumnOptions
) {
  Object.defineProperty(object, propertyName, {
    enumerable: true,
    configurable: false,
    get: options.get
  });
}
