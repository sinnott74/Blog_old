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
import Tag from "./Tag";

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
