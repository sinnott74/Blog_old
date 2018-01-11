export const arrayToObject = (array) => {
  let object = array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
  return object;
}

export const objectToIDKeyedObject = (obj) => {
  let objectKeyedByID = {};
  objectKeyedByID[obj.id] = obj;
  return objectKeyedByID;
}