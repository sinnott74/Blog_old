const asyncHooks = require("async_hooks");

const map = new Map();

const hooks = asyncHooks.createHook({
  init: function init(asyncId, type, triggerAsyncId) {
    const parentContext = map.get(triggerAsyncId);
    if (parentContext) {
      map.set(asyncId, parentContext);
    }
  },

  /**
   * Remove the data
   */
  destroy: function destroy(asyncId) {
    if (!map.has(asyncId)) {
      return;
    }
    map.delete(asyncId);
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
  const id = getCurrentId();
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
  return data[key];
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
