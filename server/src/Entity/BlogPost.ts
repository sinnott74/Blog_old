// import ORM from "sinnott-orm";
// import User from "./User";
// import MomentDate from "../util/Date";
// const DataTypes = ORM.DataTypes;

// const BlogPost = ORM.define(
//   "blogpost",
//   {
//     title: {
//       type: DataTypes.STRING,
//       length: 255,
//       notNull: true
//     },
//     text: {
//       type: DataTypes.TEXT,
//       notNull: true,
//       default: true
//     },
//     created_on: {
//       type: DataTypes.TIMESTAMP,
//       notNull: true
//     }
//   },
//   {
//     customAttributes: {
//       date: {
//         get: function() {
//           return new MomentDate(this.created_on).toString();
//         }
//       }
//     }
//   }
// );

// User.oneToMany(BlogPost, { as: "author" });

// BlogPost.getBlogPostDetails = async function(id: number) {
//   let blogPostAndAuthor = BlogPost.get(id, { includes: ["author", "tags"] });
//   return blogPostAndAuthor;
// };

// BlogPost.listBlogPostDetails = async function() {
//   const blogPostsAndAuthors = BlogPost.findAll(
//     {},
//     { includes: ["author", "tags"] }
//   );
//   return blogPostsAndAuthors;
// };

// BlogPost.beforeCreate = function() {
//   this.created_on = new Date();
// };

// export default BlogPost;

import {
  Entity,
  Column,
  DerivedColumn,
  BaseModel,
  ManyToOne,
  STRING,
  TEXT,
  TIMESTAMP,
  ManyToMany
} from "sinnott-orm-typed";
import User from "./User";
import MomentDate from "../util/Date";
import { Tag } from ".";

@Entity()
export default class BlogPost extends BaseModel {
  @Column({ type: STRING, notNull: true, length: 255 })
  title: string;

  @Column({ type: TEXT, notNull: true })
  text: string;

  @Column({ type: TIMESTAMP, notNull: true })
  created_on: Date;

  @DerivedColumn({
    get: function() {
      return new MomentDate(this.created_on).toString();
    }
  })
  date: string;

  @ManyToOne({ type: () => User })
  author: User;

  @ManyToMany({ type: () => Tag, throughName: "blogposttag" })
  tags: Tag[];

  beforeCreate() {
    this.created_on = new Date();
  }

  static async getBlogPostDetails(id: number) {
    const blogPostAndAuthor = BlogPost.get<BlogPost>(id, {
      includes: ["author", "tags"]
    });
    return blogPostAndAuthor;
  }

  static async listBlogPostDetails() {
    const blogPostsAndAuthors = BlogPost.findAll<BlogPost>(
      {},
      { includes: ["author", "tags"] }
    );
    return blogPostsAndAuthors;
  }
}
