import { transaction } from "sinnott-orm-typed";
import Tag from "../dist/Entity/Tag";
import dbConfig from "../dist/config/databaseConfig";

describe("Tag", () => {
  it("can be saved and read back", async done => {
    await transaction(dbConfig, async () => {
      const name = "Test";
      const tag = new Tag({ name });
      await tag.save();
      const foundTag = await Tag.findByTagName(name);
      expect(foundTag).toEqual(tag);
      done();
    });
  });

  it("doesn't allow duplicate tagnames", async done => {
    await transaction(dbConfig, async () => {
      const name = "Test";

      const tag1 = new Tag({ name });
      await tag1.save();

      const tag2 = new Tag({ name });
      await tag2.save();

      const foundTag = await Tag.findByTagName(name);
      expect(foundTag).toEqual(tag1);
      expect(foundTag).toEqual(tag2);
      expect(tag1.id).toEqual(tag2.id);

      const testTags = await Tag.findAll({ name });
      expect(testTags.length).toEqual(1);
      done();
    });
  });
});

// yarn build && ../node_modules/jest/bin/jest.js manytoone.e2e.ts
