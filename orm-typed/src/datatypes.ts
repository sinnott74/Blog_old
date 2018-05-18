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

/**
 * Boolean
 */
export class BOOLEAN extends AbstractDataType {
  static getSQLType() {
    return "BOOLEAN";
  }
}

/**
 * INT
 */
export class INT extends AbstractDataType {
  static getSQLType(attributeOptions?: DataTypeOption) {
    if (attributeOptions && attributeOptions.autoIncrement) {
      return "SERIAL";
    }
    return "INT";
  }
}

/**
 * String
 */
export class STRING extends AbstractDataType {
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

/**
 * Text
 */
export class TEXT extends AbstractDataType {
  static getSQLType() {
    return "TEXT";
  }
}

/**
 * Timestamp
 */
export class TIMESTAMP extends AbstractDataType {
  static getSQLType() {
    return "TIMESTAMP WITH TIME ZONE";
  }
}

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
