const ORM = require('../util/orm');
const DataTypes = ORM.DataTypes;
const BlogPost = require('./BlogPost');

const Tag = ORM.define('tag', {
    name: {
      type: DataTypes.STRING,
      length: 255,
      notNull: true,
    }
  }
);

BlogPost.manyToMany(Tag, {through: 'blogposttag'});

module.exports = Tag;