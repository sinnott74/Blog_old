const datatypes = require("../src/datatypes");

it("BooleanDataType sql type is boolean", () => {
  const bool = datatypes.BOOLEAN;
  expect(bool.getSQLType()).toMatch("boolean");
});

it("IntDataType sql type is INT", () => {
  const int = datatypes.INT;
  const attributeOptions = {};
  expect(int.getSQLType(attributeOptions)).toMatch("INT");
});

it("IntDataType sql type is SERIAL when autoincrement is set", () => {
  const int = datatypes.INT;
  const attributeOptions = { autoIncrement: true };
  expect(int.getSQLType(attributeOptions)).toMatch("SERIAL");
});

it("TextDataType sql type is TEXT", () => {
  const text = datatypes.TEXT;
  expect(text.getSQLType()).toMatch("TEXT");
});

it("TimeStampDataType sql type is TIMESTAMP WITH TIME ZONE", () => {
  const text = datatypes.TIMESTAMP;
  expect(text.getSQLType()).toMatch("TIMESTAMP WITH TIME ZONE");
});

it("StringDataType sql type is varchar", () => {
  const string = datatypes.STRING;
  const attributeOptions = {};
  expect(string.getSQLType(attributeOptions)).toMatch("varchar");
});

it("StringDataType sql type is varchar(length) when length set", () => {
  const string = datatypes.STRING;
  const attributeOptions = { length: 10 };
  expect(string.getSQLType(attributeOptions)).toMatch("varchar(10)");
});

it("StringDataType sql type throws when length > 255", () => {
  const string = datatypes.STRING;
  const attributeOptions = { length: 256 };
  expect(() => {
    string.getSQLType(attributeOptions);
  }).toThrow("String too long, use TextDataType instead");
});

it("AbstractDataType can't be instantiated", () => {
  const abstract = datatypes.ABSTRACT;
  expect(() => {
    abstract.getSQLType();
  }).toThrow("get getSQLType must be implemented");
});
