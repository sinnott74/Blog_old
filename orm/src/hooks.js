/**
 * Hooks mixins for Model
 */
const Model = require("./model.js");

/**
 * List of hooks available
 */
Model.afterInitialize = function() {};
Model.beforeValidate = function() {};
Model.afterValidate = function() {};
Model.beforeSave = function() {};
Model.afterSave = function() {};
Model.beforeCreate = function() {};
Model.afterCreate = function() {};
Model.beforeUpdate = function() {};
Model.afterUpdate = function() {};
Model.beforeDestroy = function() {};
Model.afterDestroy = function() {};
