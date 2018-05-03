import {
  BaseModel,
  Entity,
  Column,
  DerivedColumn,
  metadata
} from "../dist/orm";

@Entity()
class Person extends BaseModel {
  @Column() firstname: string;

  @Column() lastname: string;

  @DerivedColumn({
    get: function() {
      return `${this.firstname} ${this.lastname}`;
    }
  })
  fullname: string;
}

beforeAll(async () => {
  metadata.build();
});

beforeEach(async () => {
  await Person.drop();
  await Person.sync();
});

describe("Basic Entity interaction", () => {
  it("saves a person and reads it back", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person.save();

    const gottenPerson = await Person.get<Person>(person.id);
    expect(gottenPerson).toEqual(person);

    const searchedPerson = await Person.findOne<Person>({
      firstname: "Joe",
      lastname: "Bloggs"
    });
    expect(searchedPerson).toEqual(person);
  });

  it("saves a person, reads it back & modifies it", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person.save();

    const gottenPerson = await Person.get<Person>(person.id);
    expect(gottenPerson).toEqual(person);

    gottenPerson.firstname = "Joseph";
    gottenPerson.save();

    const BloggsPeople = await Person.findAll<Person>({
      lastname: "Bloggs"
    });

    expect(BloggsPeople.length).toBe(1);
    expect(BloggsPeople[0]).toEqual(gottenPerson);
  });

  it("saves a person then deletes it", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person.save();

    const gottenPerson = await Person.get<Person>(person.id);
    expect(gottenPerson).toEqual(person);

    await person.delete();

    const allPeople = await Person.findAll<Person>();
    expect(allPeople.length).toBe(0);
  });

  it("saves a few people then counts them", async () => {
    const person1 = new Person({ firstname: "Joe", lastname: "Bloggs" });
    const person2 = new Person({ firstname: "Joe", lastname: "Bloggs" });
    const person3 = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person1.save();
    await person2.save();
    await person3.save();

    const numPeople = await Person.count();
    expect(numPeople).toBe(3);
  });

  it("saves a few people then finds some", async () => {
    const JoeBloggs = new Person({ firstname: "Joe", lastname: "Bloggs" });
    const JaneBloggs = new Person({ firstname: "Jane", lastname: "Bloggs" });
    const JohnSnow = new Person({ firstname: "John", lastname: "Snow" });
    await JoeBloggs.save();
    await JaneBloggs.save();
    await JohnSnow.save();

    const BloggsPeople = await Person.findAll<Person>({ lastname: "Bloggs" });
    expect(BloggsPeople.length).toBe(2);
    expect(BloggsPeople).toContainEqual(JoeBloggs);
    expect(BloggsPeople).toContainEqual(JaneBloggs);
  });

  it("has a dervived column", () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    expect(person.fullname).toEqual("Joe Bloggs");
  });
});

// yarn build && ../node_modules/jest/bin/jest.js entity.e2e.ts
