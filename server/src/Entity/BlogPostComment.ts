// import ORM from "sinnott-orm";
// const DataTypes = ORM.DataTypes;
// import BlogPost from "./BlogPost";

// const BlogPostComment = ORM.define("blogpostcomment", {
//   comment: {
//     type: DataTypes.TEXT,
//     notNull: true
//   }
// });

// BlogPost.oneToMany(BlogPostComment);

// export default BlogPostComment;

import { Entity, Column, BaseModel, ManyToOne, TEXT } from "sinnott-orm-typed";
import BlogPost from "./BlogPost";

@Entity()
export default class BlogPostComment extends BaseModel {
  @Column({ type: TEXT, notNull: true })
  comment: string;

  @ManyToOne({ type: () => BlogPost })
  blogpost: BlogPost;
}
