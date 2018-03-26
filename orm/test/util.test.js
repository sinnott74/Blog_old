/**
 * Tests Util
 */
const util = require("../src/util");

test("pluralises string", () => {
  expect(util.puralize("test")).toBe("tests");
});

test("Capitalises a string", () => {
  expect(util.capitalize("test")).toBe("Test");
});
