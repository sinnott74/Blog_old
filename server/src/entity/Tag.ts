import {
  Entity,
  Column,
  BaseModel,
  ManyToMany,
  STRING
} from "sinnott-orm-typed";
import BlogPost from "./BlogPost";

@Entity()
export default class Tag extends BaseModel {
  @Column({ type: STRING, notNull: true, length: 255, unique: true })
  name: string;

  @ManyToMany({ type: () => BlogPost, throughName: "blogposttag" })
  blogposts: BlogPost[];

  async beforeSave() {
    const storedTag = await Tag.findByTagName(this.name);
    if (storedTag) {
      (this as Tag).overwrite(storedTag);
    }
  }

  static async findByTagName(tagName: string) {
    return Tag.findAtMostOne<Tag>({ name: tagName });
  }
}
