const ORM = require('../util/orm');
const DataTypes = require('../util/orm/datatypes');
const BlogPost = require('./BlogPost');

const BlogPostComment = ORM.define('blogpostcomment', {
    comment: {
      type: DataTypes.TEXT,
      notNull: true
    }
  }
);

BlogPost.oneToMany(BlogPostComment);

module.exports = BlogPostComment;