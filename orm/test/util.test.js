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

test("Data is grouped correctly", () => {
  const given = [
    {
      id: 1,
      name: "parent1",
      "child.id": 1,
      "child.name": "child1"
    },
    {
      id: 1,
      name: "parent1",
      "child.id": 2,
      "child.name": "child2"
    },
    {
      id: 2,
      name: "parent2",
      "child.id": 1,
      "child.name": "child1"
    },
    {
      id: 2,
      name: "parent2",
      "child.id": 2,
      "child.name": "child2"
    },
    {
      id: 1,
      name: "parent1",
      "child.id": 3,
      "child.name": "child3",
      "child.grandchild.id": 1,
      "child.grandchild.name": "grandchild1"
    }
  ];

  const expected = [
    {
      id: 1,
      name: "parent1",
      child: [
        {
          id: 1,
          name: "child1"
        },
        {
          id: 2,
          name: "child2"
        },
        {
          id: 3,
          name: "child3",
          grandchild: [
            {
              id: 1,
              name: "grandchild1"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "parent2",
      child: [
        {
          id: 1,
          name: "child1"
        },
        {
          id: 2,
          name: "child2"
        }
      ]
    }
  ];

  expect(util.groupData(given)).toEqual(expected);
});

test("Defines an immutable property", () => {
  const object = {};
  util.defineImmutableProperty(object, "property", "value");
  const expected = {
    value: "value",
    writable: false,
    enumerable: false,
    configurable: false
  };
  expect(object.property).toBe("value");
  expect(Object.getOwnPropertyDescriptor(object, "property")).toEqual(expected);
});

test("Define a non enumerable property", () => {
  const object = {};
  util.defineNonEnumerableProperty(object, "property", "value");
  const expected = {
    writable: true,
    enumerable: false,
    configurable: true,
    value: "value",
    get: undefined,
    set: undefined
  };
  expect(object.property).toBe("value");
  expect(Object.getOwnPropertyDescriptor(object, "property")).toEqual(expected);
});

test("Define a non enumerable property", () => {
  const object = {};
  util.defineNonEnumerableProperty(object, "property", "value");
  const expected = {
    writable: true,
    enumerable: false,
    configurable: true,
    value: "value",
    get: undefined,
    set: undefined
  };
  expect(object.property).toBe("value");
  expect(Object.getOwnPropertyDescriptor(object, "property")).toEqual(expected);
});
