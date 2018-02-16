const isPlainObject = require('lodash.isplainobject');

/**
 * Utility Functions
 */
class Util {

  get kSEPERATOR() {
    return '.';
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
    const convertedDotObjects = arr.map((obj) => {
      return this._splitIntoNestedObjects(obj, seperator)
    })
    let topList = {};
    convertedDotObjects.forEach((obj) => {
      this._combineNestedObjectIntoGroup(topList, obj);
    });
    return topList
  }

  /**
   * Recursiveley splits the object into the group
   */
  _combineNestedObjectIntoGroup(group, object) {
    if(!group[object.id]) {
      group[object.id] = {};
    }
    let localGroup = group[object.id];

    Object.keys(object).forEach((key) => {
      let value = object[key];
      if(isPlainObject(value)){
        let keyPlural = `${key}s`;
        if(!localGroup[keyPlural]) {
          localGroup[keyPlural] = {};
        }
        localGroup = localGroup[keyPlural];
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
    seperator = seperator || kSEPERATOR;

    obj = {
      ...obj
    };
    for (var key in obj) {
      if (key.indexOf(seperator) !== -1) {
        // this._parseDotNotation(obj, key, obj[key]);
        let value = obj[key];
        let currentObj = obj;
        let keys = key.split(seperator);
        let keysLength = Math.max(1, keys.length - 1);
        let localKey, i;

        for (i = 0; i < keysLength; ++i) {
          localKey = keys[i];
          currentObj[localKey] = currentObj[localKey] || {};
          currentObj = currentObj[localKey];
        }
        currentObj[keys[i]] = value;
        delete obj[key];
      }
    }
    return obj;
  }
}

module.exports = new Util();