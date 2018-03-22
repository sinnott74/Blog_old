const asyncHooks = require("async_hooks");
const nano = require("nano-seconds");

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
function get(id, key) {
  /* istanbul ignore if */
  const data = map.get(id);
  if (!data) {
    return null;
  }
  const value = data[key];
  if (isUndefined(value) && data.parentId) {
    return get(data.parentId, key);
  }
  return value;
}

let currentId = 0;
const hooks = asyncHooks.createHook({
  init: function init(asyncId, type, triggerAsyncId) {
    const parentId = triggerAsyncId || currentId;
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
    // debug(`${asyncId}(${type}) init by ${triggerAsyncId}`);
    // map.set(asyncId, data);
  },
  /**
   * Set the current id
   */
  before: function before(id) {
    currentId = id;
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
 * Get the current id
 */
function getCurrentId() {
  if (asyncHooks.executionAsyncId) {
    return asyncHooks.executionAsyncId();
  }
  return asyncHooks.currentId() || currentId;
}

/**
 * Get the current id
 */
exports.currentId = getCurrentId;

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
  /* istanbul ignore if */
  if (key === "created" || key === "parent") {
    throw new Error("can't set created and parent");
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
  const value = get(id, key);
  debug(`get ${key}:${value} from ${currentId}`);
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

/**
 * Get the use the of id
 * @param {Number} id The tigger id, is optional, default is `als.currentId()`
 * @returns {Number} The use time(ns) of the current id
 */
exports.use = function getUse(id) {
  const data = map.get(id || getCurrentId());
  /* istanbul ignore if */
  if (!data) {
    return -1;
  }
  return nano.difference(data.created);
};
