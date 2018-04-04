import ORM from "sinnott-orm";
const DataTypes = ORM.DataTypes;
import BlogPost from "./BlogPost";

const BlogPostComment = ORM.define("blogpostcomment", {
  comment: {
    type: DataTypes.TEXT,
    notNull: true
  }
});

BlogPost.oneToMany(BlogPostComment);

export default BlogPostComment;
