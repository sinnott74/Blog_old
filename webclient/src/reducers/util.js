
/**
 * Converts an array object to a single object.
 *
 * e.g. [{id: 1, value: "one"}, {id: 2, value: "two"}]
 * is converted to :
 * {1: {id: 1, value: "one"}, 2: {id: 2, value: "two"}}
 *
 * @param idName - name if the ID attribute
 * @param array - Array of object to convert to an object.
 *
 */
export const arrayToObject = (idName, array) => {
  let object = array.reduce((obj, item) => {
    let id = item[idName];
    obj[id] = item;
    return obj;
  }, {});
  return object;
}

/**
 * Converts an object to another object which contains an attribute, keyed by the original objects ID & has its value.
 *
 * e.g. {id: 1, value: "one"} is converted to {1: {id: 1, value: "one"}}
 */
export const objectToIDKeyedObject = (idName, obj) => {
  let objectKeyedByID = {};
  let id = obj[idName];
  objectKeyedByID[id] = obj;
  return objectKeyedByID;
}