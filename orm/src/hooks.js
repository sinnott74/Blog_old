/**
 * Hooks mixins for Model
 */
const Model = require('./model.js');

/**
 * List of hooks available
 */
Model.afterInitialize = new function(){};
Model.beforeValidate = new function(){};
Model.afterValidate = new function(){};
Model.beforeSave = new function(entity){};
Model.afterSave = new function(entity){};
Model.beforeCreate = new function(entity){};
Model.afterCreate = new function(entity){};
Model.beforeUpdate = new function(entity){};
Model.afterUpdate = new function(entity){};
Model.beforeDestroy = new function(){};
Model.afterDestroy = new function(){};
