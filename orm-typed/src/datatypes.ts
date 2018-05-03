export interface DataTypeOption {
  length?: number;
  autoIncrement?: boolean;
}

/**
 * Abstract Super Class
 */
export abstract class AbstractDataType {
  static getSQLType(attributeOptions?: DataTypeOption): string {
    throw new Error("get getSQLType must be implemented");
  }
}
export const ABSTRACT = AbstractDataType;

/**
 * Boolean
 */
export class BooleanDataType extends AbstractDataType {
  static getSQLType() {
    return "BOOLEAN";
  }
}
export const BOOLEAN = BooleanDataType;

/**
 * INT
 */
export class IntDataType extends AbstractDataType {
  static getSQLType(attributeOptions?: DataTypeOption) {
    if (attributeOptions && attributeOptions.autoIncrement) {
      return "SERIAL";
    }
    return "INT";
  }
}

export const INT = IntDataType;

/**
 * String
 */
export class StringDataType extends AbstractDataType {
  static getSQLType(attributeOptions?: DataTypeOption) {
    if (
      attributeOptions &&
      attributeOptions.length &&
      attributeOptions.length > 255
    ) {
      throw new Error("String too long, use TextDataType instead");
    }
    return attributeOptions && attributeOptions.length
      ? `VARCHAR(${attributeOptions.length})`
      : "VARCHAR";
  }
}
export const STRING = StringDataType;

/**
 * Text
 */
export class TextDataType extends AbstractDataType {
  static getSQLType() {
    return "TEXT";
  }
}
export const TEXT = TextDataType;

/**
 * Timestamp
 */
export class TimeStampDataType extends AbstractDataType {
  static getSQLType() {
    return "TIMESTAMP WITH TIME ZONE";
  }
}
export const TIMESTAMP = TimeStampDataType;

export function getSQLDataType(type: string) {
  switch (type.toUpperCase()) {
    case "NUMBER":
    case "INT":
    case "INTEGER":
      return "INT";
    case "STRING":
      return "VARCHAR";
    case "BOOL":
    case "BOOLEAN":
      return "BOOLEAN";
    case "SERIAL":
      return "SERIAL";
    default:
      return undefined;
  }
}
