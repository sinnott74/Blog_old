const ORM = require("sinnott-orm");
const DataTypes = ORM.DataTypes;
const BlogPost = require("./BlogPost");

const BlogPostComment = ORM.define("blogpostcomment", {
  comment: {
    type: DataTypes.TEXT,
    notNull: true
  }
});

BlogPost.oneToMany(BlogPostComment);

module.exports = BlogPostComment;
