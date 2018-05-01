import * as datatypes from "../dist/datatypes";

test("BOOLEANDataType sql type is BOOLEAN", () => {
  const bool = datatypes.BOOLEAN;
  expect(bool.getSQLType()).toMatch("BOOLEAN");
});

test("IntDataType sql type is INT", () => {
  const int = datatypes.INT;
  const attributeOptions = {};
  expect(int.getSQLType(attributeOptions)).toMatch("INT");
});

test("IntDataType sql type is SERIAL when autoincrement is set", () => {
  const int = datatypes.INT;
  const attributeOptions = { autoIncrement: true };
  expect(int.getSQLType(attributeOptions)).toMatch("SERIAL");
});

test("TextDataType sql type is TEXT", () => {
  const text = datatypes.TEXT;
  expect(text.getSQLType()).toMatch("TEXT");
});

test("TimeStampDataType sql type is TIMESTAMP WITH TIME ZONE", () => {
  const text = datatypes.TIMESTAMP;
  expect(text.getSQLType()).toMatch("TIMESTAMP WITH TIME ZONE");
});

test("StringDataType sql type is VARCHAR", () => {
  const string = datatypes.STRING;
  const attributeOptions = {};
  expect(string.getSQLType(attributeOptions)).toMatch("VARCHAR");
});

test("StringDataType sql type is VARCHAR(length) when length set", () => {
  const string = datatypes.STRING;
  const attributeOptions = { length: 10 };
  expect(string.getSQLType(attributeOptions)).toMatch("VARCHAR(10)");
});

test("StringDataType sql type throws when length > 255", () => {
  const string = datatypes.STRING;
  const attributeOptions = { length: 256 };
  expect(() => {
    string.getSQLType(attributeOptions);
  }).toThrow("String too long, use TextDataType instead");
});

test("AbstractDataType can't be instantiated", () => {
  const abstract = datatypes.ABSTRACT;
  expect(() => {
    abstract.getSQLType();
  }).toThrow("get getSQLType must be implemented");
});
