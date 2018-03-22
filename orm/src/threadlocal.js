const asyncHooks = require("async_hooks");
const debug = require("debug")("async-local-storage");

const map = new Map();

function isUndefined(value) {
  return value === undefined;
}

/**
 * Get data from itself or parent
 * @param {any} data The map data
 * @param {any} key The key
 * @returns {any}
 */
function recursiveGet(data, key) {
  if (!data) {
    return null;
  }
  const value = data[key];
  if (isUndefined(value) && data.parent) {
    return recursiveGet(data.parent, key);
  }
  return value;
}

const hooks = asyncHooks.createHook({
  init: function init(asyncId, type, triggerAsyncId) {
    const parentId = triggerAsyncId;
    // not tigger by itself, add parent
    if (parentId !== asyncId) {
      const parent = map.get(parentId);
      if (parent) {
        const data = { parent: parent };
        debug(`${asyncId}(${type}) init by ${triggerAsyncId}`);
        map.set(asyncId, data);
        debug(`map size ${map.size}`);
      }
    }
  },

  /**
   * Remove the data
   */
  destroy: function destroy(id) {
    if (!map.has(id)) {
      return;
    }
    debug(`destroy ${id}`);
    map.delete(id);
    debug(`map size ${map.size}`);
  }
});

function getCurrentId() {
  return asyncHooks.executionAsyncId();
}

/**
 * Enable the async hook
 */
exports.enable = () => hooks.enable();

/**
 * Disable the async hook
 */
exports.disable = () => hooks.disable();

/**
 * Get the size of map
 */
exports.size = () => map.size;

/**
 * Set the key/value for this score
 * @param {String} key The key of value
 * @param {String} value The value
 */
exports.set = function setValue(key, value) {
  if (key === "parentId") {
    throw new Error("can't set parentId");
  }
  const id = getCurrentId();
  debug(`set ${key}:${value} to ${id}`);
  let data = map.get(id);
  if (!data) {
    data = {};
    map.set(id, data);
  }
  data[key] = value;
};

/**
 * Get the value by key
 * @param {String} key The key of value
 */
exports.get = function getValue(key) {
  const id = getCurrentId();
  const data = map.get(id);
  const value = recursiveGet(data, key);
  debug(`get ${key}:${value} from ${id}`);
  return value;
};

/**
 * Remove the data of the current id
 */
exports.remove = function removeValue() {
  const id = getCurrentId();
  if (id) {
    map.delete(id);
  }
};
