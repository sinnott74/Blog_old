const ORM = require('../util/ORM');
const DataTypes = require('../util/ORM/DataTypes');
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