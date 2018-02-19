const { performance } = require('perf_hooks');
const isPlainObject = require('lodash.isplainobject');
const Util = require('./src/util/ORM/Util');


let data = [{
    id: 1,
    name: 'parent1',
    child_id: 1,
    child_name: 'child1'
  }, {
    id: 1,
    name: 'parent1',
    child_id: 2,
    child_name: 'child2'
  }, {
    id: 2,
    name: 'parent2',
    child_id: 1,
    child_name: 'child1'
  }, {
    id: 2,
    name: 'parent2',
    child_id: 2,
    child_name: 'child2'
  }, {
    id: 1,
    name: 'parent1',
    child_id: 3,
    child_name: 'child3',
    child_grandchild_id: 1,
    child_grandchild_name: 'grandchild1'
  }
]

var t0 = performance.now();
let groupedData = Util.groupData(data, '_');
var t1 = performance.now();
console.log(JSON.stringify(groupedData, null, 2));
console.log("Call to groupData took " + (t1 - t0) + " milliseconds.");