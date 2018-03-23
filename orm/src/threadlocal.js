const asyncHooks = require("async_hooks");

const map = new Map();

const hooks = asyncHooks.createHook({
  /**
   * Sets the parent's context as the current context
   */
  init: function init(asyncId, type, triggerAsyncId) {
    const parentContext = map.get(triggerAsyncId);
    if (parentContext) {
      // set parent context as current context
      map.set(asyncId, parentContext);
    }
  },

  /**
   * Remove the data
   */
  destroy: function destroy(asyncId) {
    if (map.has(asyncId)) {
      map.delete(asyncId);
    }
  }
});
hooks.enable();

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
  const id = asyncHooks.executionAsyncId();
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
  const data = map.get(id);
  return data[key];
};
