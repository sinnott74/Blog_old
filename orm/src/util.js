const isPlainObject = require("lodash.isplainobject");

/**
 * Utility Functions
 */
class Util {
  get kSEPERATOR() {
    return ".";
  }

  /**
   * Groups array of data together
   * @param {Array<Object>} arr
   * @param the Character used to seperate e.g. '.'
   *
   * @example
   * Give the input
   * [{
   *   id: 1,
   *   name: 'parent1',
   *   child.id: 1,
   *   child.name: 'child1'
   * }, {
   *   id: 1,
   *   name: 'parent1',
   *   child.id: 2,
   *   child.name: 'child2'
   * }, {
   *   id: 2,
   *   name: 'parent2',
   *   child.id: 1,
   *   child.name: 'child1'
   * }, {
   *   id: 2,
   *   name: 'parent2',
   *   child.id: 2,
   *   child.name: 'child2'
   * }, {
   *   id: 1,
   *   name: 'parent1',
   *   child.id: 3,
   *   child.name: 'child3',
   *   child.grandchild_id: 1,
   *   child.grandchild_name: 'grandchild1'
   * }]
   * would return
   * {
   * "1": {
   *   "id": 1,
   *   "name": "parent1",
   *   "childs": {
   *     "1": {
   *       "id": 1,
   *       "name": "child1"
   *     },
   *     "2": {
   *       "id": 2,
   *       "name": "child2"
   *     },
   *     "3": {
   *       "id": 3,
   *       "name": "child3",
   *       "grandchilds": {
   *         "1": {
   *           "id": 1,
   *           "name": "grandchild1"
   *         }
   *       }
   *     }
   *   }
   * },
   * "2": {
   *   "id": 2,
   *   "name": "parent2",
   *   "childs": {
   *     "1": {
   *       "id": 1,
   *       "name": "child1"
   *     },
   *     "2": {
   *       "id": 2,
   *       "name": "child2"
   *     }
   *   }
   * }
   * }
   */
  groupData(arr, seperator) {
    // convert each for into dot objects
    const convertedDotObjects = arr.map(obj => {
      return this._splitIntoNestedObjects(obj, seperator);
    });

    // convert dot objects array into keyed objects
    let topList = {};
    convertedDotObjects.forEach(obj => {
      this._combineNestedObjectIntoGroup(topList, obj);
    });

    // convert keyed objects into object array
    const returnArray = [];
    this._convertKeyObjectToArrays(topList, returnArray);
    return returnArray;
  }

  _convertKeyObjectToArrays(keyedObject, array) {
    // Loop though each ID key
    Object.keys(keyedObject).forEach(key => {
      // Get the object for that ID
      let object = keyedObject[key];

      // Loop through each attribute of that object
      Object.keys(object).forEach(attribute => {
        const value = object[attribute];
        if (isPlainObject(value)) {
          const childArray = [];
          this._convertKeyObjectToArrays(value, childArray);
          object[attribute] = childArray;
        }
      });
      array.push(object);
    });
  }

  /**
   * Recursiveley splits the object into the group
   */
  _combineNestedObjectIntoGroup(group, object) {
    if (!group[object.id]) {
      group[object.id] = {};
    }
    let localGroup = group[object.id];

    Object.keys(object).forEach(key => {
      let value = object[key];
      if (isPlainObject(value)) {
        if (!localGroup[key]) {
          localGroup[key] = {};
        }
        localGroup = localGroup[key];
        this._combineNestedObjectIntoGroup(localGroup, value);
        localGroup = group[object.id];
      } else {
        localGroup[key] = value;
      }
    });
  }

  /**
   * Converts an object with attributes which are dot notation named to nest objects
   * @param {*} obj
   * @param {String} seperator The string which seperates levels. Defaults to '.'
   * @example
   * {
   *  user_id: 1,
   *  username: 'test@test.com',
   *  address.id: 1,
   *  address.line1: '123 fake st',
   *  address.planet: 'Earth'
   * }
   *
   * is converted to:
   *
   * {
   *  user_id: 1,
   *  username: 'test@test.com',
   *  address: {
   *    id: 1
   *    line1: '123 fake st',
   *    planet: 'Earth'
   *  }
   * }
   */
  _splitIntoNestedObjects(obj, seperator) {
    seperator = seperator || this.kSEPERATOR;

    for (let key in obj) {
      if (key.indexOf(seperator) !== -1) {
        const value = obj[key];
        if (value != null) {
          let currentObj = obj;
          const keys = key.split(seperator);
          const keysLength = Math.max(1, keys.length - 1);
          let localKey, i;

          for (i = 0; i < keysLength; ++i) {
            localKey = keys[i];
            currentObj[localKey] = currentObj[localKey] || {};
            currentObj = currentObj[localKey];
          }
          currentObj[keys[i]] = value;
        }
        delete obj[key];
      }
    }
    return obj;
  }

  /**
   * Defines an property which isn't writable, enumerable or configurable
   * @param {*} object Object on which to set the property
   * @param {String} property name of the property
   * @param {*} value value of the property
   */
  defineImmutableProperty(object, property, value) {
    Object.defineProperty(object, property, {
      writable: false,
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  /**
   * Defines an property which isn't writable, enumerable or configurable
   * @param {*} object Object on which to set the property
   * @param {String} property name of the property
   * @param {*} value value of the property
   */
  defineNonEnumerableProperty(object, property, value) {
    Object.defineProperty(object, property, {
      writable: true,
      enumerable: false,
      configurable: true,
      value: value
    });
  }

  /**
   * Adds a getter & setter onto the prototype of the given object.
   * @param {Model} model Model to add the getter & setter to
   * @param {String} name Attribute name
   */
  defineGetterAndSetter(model, name) {
    // Add getter & setter for foreign reference
    Object.defineProperty(model.prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        this.set(name, value);
      },
      enumerable: true
    });
  }

  /**
   * Capitalizes the first letter of the string
   * @param {String} string
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Adds an S to the end if the given string
   * @param {*} string
   */
  puralize(string) {
    return `${string}s`;
  }

  /**
   * Array.forEach does not work with async code which must be awaited.
   * @param {Array} array
   * @param {Function} async callback
   */
  async asyncForEach(array, callback) {
    const promises = [];
    for (let index = 0; index < array.length; index++) {
      const promise = callback(array[index], index, array);
      promises.push(promise);
    }
    return Promise.all(promises);
  }
}

module.exports = new Util();
