const asyncHooks = require("async_hooks");
// const nano = require("nano-seconds");

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
function recursiveGet(id, key) {
  const data = map.get(id);
  if (!data) {
    return null;
  }
  const value = data[key];
  if (isUndefined(value) && data.parentId) {
    return recursiveGet(data.parentId, key);
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
        const data = { parentId: parentId };
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
  const id = asyncHooks.executionAsyncId();
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
  const id = asyncHooks.executionAsyncId();
  const value = recursiveGet(id, key);
  debug(`get ${key}:${value} from ${id}`);
  return value;
};

/**
 * Remove the data of the current id
 */
exports.remove = function removeValue() {
  const id = asyncHooks.executionAsyncId();
  if (id) {
    map.delete(id);
  }
};
