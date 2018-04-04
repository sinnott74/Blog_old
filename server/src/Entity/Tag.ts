import ORM from "sinnott-orm";
const DataTypes = ORM.DataTypes;
import BlogPost from "./BlogPost";

const Tag = ORM.define("tag", {
  name: {
    type: DataTypes.STRING,
    length: 255,
    notNull: true,
    unique: true
  }
});

BlogPost.manyToMany(Tag, { through: "blogposttag" });

/**
 * Reads a tag with the given name
 * @param {String} tagName
 * @return {Promise<Tag>} may resolve to undefined
 */
Tag.findByTagName = async function(tagName: string) {
  return Tag.findAtMostOne({ name: tagName });
};

/**
 * Searches for a Tag with the same Tag name & overwrites this Tag with the persisted Tag.
 */
Tag.beforeSave = async function() {
  const storedTag = await Tag.findByTagName(this.name);
  if (storedTag) {
    this.overwrite(storedTag);
  }
};

export default Tag;
