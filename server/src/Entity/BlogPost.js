const ORM = require('../util/orm');
const DataTypes = require('../util/orm/datatypes');
const User = require('./User');
const MomentDate = require('../util/Date');

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
  }, {
    customAttributes: {
      date: {
        get: function(){
          return new MomentDate(this.created_on).toString();
        }
      }
    }
  }
);

User.oneToMany(BlogPost, {as: 'author'});

BlogPost.getBlogPostDetails = async function(id) {
  let blogPostAndAuthor = BlogPost.get(id, {includes: ['author']});
  return blogPostAndAuthor;
}

BlogPost.listBlogPostDetails = async function() {
  const blogPostsAndAuthors = BlogPost.findAll({}, {includes: ['author']});
  return blogPostsAndAuthors;
}

BlogPost.beforeCreate = function(blogPost) {
  blogPost.created_on = new Date();
}

module.exports = BlogPost;