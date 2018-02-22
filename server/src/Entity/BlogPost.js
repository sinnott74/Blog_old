const ORM = require('../util/orm');
const DataTypes = require('../util/orm/datatypes');
const User = require('./User');

const BlogPost = ORM.define('blogpost', {
    title: {
      type: DataTypes.STRING,
      length: 255,
      notNull: true
    },
    text: {
      type: DataTypes.TEXT,
      notNull: true,
      default: true,
    },
    created_on: {
      type: DataTypes.TIMESTAMP,
      notNull: true
    }
  }
);

User.oneToMany(BlogPost, {as: 'author'});

BlogPost.getBlogPostDetails = async function(id) {
  let blogPostAndUser = BlogPost.get(id, {includes: ['author']});
  return blogPostAndUser;
}

BlogPost.beforeCreate = function(blogPost) {
  blogPost.created_on = new Date();
}

module.exports = BlogPost;