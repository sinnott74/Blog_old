const OneToOne = require('./OneToOne');
const OneToMany = require('./OneToMany');
const ManyToMany = require('./ManyToMany');

const Associations = {
  OneToOne: OneToOne,
  OneToMany: OneToMany,
  ManyToMany: ManyToMany
}

module.exports = Associations;