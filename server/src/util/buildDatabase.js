let entities = require('../data/definition');
let toposort = require ('toposort');
let TransactionInfo = require('../core/TransactionInfo');
let Sql = require('sql');

/**
 * Gets a list of all directed foreign key vertices the entities. E.g. [user, blogpost]
 *
 * @param {*} entities
 */
function getEntityVerticies(entities){
  let vertices = [];
  for(entity of Object.values(entities)){
    if(entity.foreignKeys){
      for(foreignKey of Object.values(entity.foreignKeys)){
        vertices.push([foreignKey.table, entity.name]);
      }
    }
  }
  return vertices;
}

/**
 * Orders entities based on foreign keys
 * @param {*} entities
 */
function getOrderedEntityNameGraph(entities) {
  let vertices = getEntityVerticies(entities);
  // sorts the entities based on the vertices. e.g. user should be created before blogpost
  let orderedEntitiesWithForeignKeys = toposort(vertices);
  return orderedEntitiesWithForeignKeys;
}


/**
 * Orders the entities by foreign keys. Those earlier in the order must be created before those later in the order
 * @param {*} entities
 */
function getOrderedEntityNames(entities) {
  let orderEntityNames = [];
  let orderedEntityNameGraph = getOrderedEntityNameGraph(entities);
  // Add entities which aren't included in any foreign keys
  for(entity of Object.values(entities)){
    if(!orderedEntityNameGraph.includes(entity.name)){
      orderEntityNames.push(entity.name);
    }
  }
  orderEntityNames.push(...orderedEntityNameGraph);
  console.log('Entity order', orderEntityNames);
  return orderEntityNames;
}

function getOrderedEntityConfigs(entities) {
  let orderedEntityConfigs = [];
  let orderEntityNames = getOrderedEntityNames(entities);
  let entitiyConfigs = Object.values(entities);
  for(entityName of Object.values(orderEntityNames)){
    for(entity of entitiyConfigs){
      if(entityName === entity.name){
        orderedEntityConfigs.push(entity);
      }
    }
  }
  return orderedEntityConfigs;
}

async function createTableIfNotExists(entityConfig) {
  let entity = Sql.define(entityConfig)
  let query = entity.create().ifNotExists().toQuery();
  let result = await TransactionInfo.get('transaction').query(query);
}

async function createTables(entityConfigs){
  for(entityConfig of Object.values(entityConfigs)) {
    console.log('Building', entityConfig.name);
    await createTableIfNotExists(entityConfig);
  }
}

let buildDatabase = async () => {
  try {
    let orderedConfigs = getOrderedEntityConfigs(entities);
    await createTables(orderedConfigs);
    await TransactionInfo.transactionSuccess();
  } catch(err) {
    console.log(err);
    await TransactionInfo.transactionFailure();
  }
}
(async () => {
  console.log('Starting database build');
  await TransactionInfo.startTransaction(buildDatabase);
  console.log('Finished database build');
})();
