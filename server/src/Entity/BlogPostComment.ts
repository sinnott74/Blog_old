import { Entity, Column, BaseModel, ManyToOne, TEXT } from "sinnott-orm-typed";
import BlogPost from "./BlogPost";

@Entity()
export default class BlogPostComment extends BaseModel {
  @Column({ type: TEXT, notNull: true })
  comment: string;

  @ManyToOne({ type: () => BlogPost })
  blogpost: BlogPost;
}
