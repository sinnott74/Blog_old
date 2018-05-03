import { BaseModel, Entity, Column, ManyToOne, metadata } from "../dist/orm";

@Entity()
class Person extends BaseModel {
  @Column() firstname: string;

  @Column() lastname: string;
}

@Entity()
class PhoneNumber extends BaseModel {
  @Column() number: number;

  @ManyToOne({ type: () => Person, eager: true })
  owner: Person;
}

beforeAll(async () => {
  metadata.build();
});

beforeAll(async () => {
  await Person.drop();
  await PhoneNumber.drop();
  await Person.sync();
  await PhoneNumber.sync();
});

describe("Basic Entity interaction", () => {
  it("creates a blogpost with the constructor and saves it", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person.save();

    const phoneNumber = new PhoneNumber({
      number: 555,
      owner: person
    });
    await phoneNumber.save();

    const foundPhoneNumber = await PhoneNumber.get<PhoneNumber>(phoneNumber.id);

    expect(foundPhoneNumber.toJSON()).toEqual(phoneNumber.toJSON());
    expect(foundPhoneNumber.owner.toJSON()).toEqual(phoneNumber.owner.toJSON());
  });

  it("creates a phonesnumber and adds the owner", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });
    await person.save();

    const phoneNumber = new PhoneNumber({
      number: 555
    });
    phoneNumber.owner = person;
    await phoneNumber.save();

    const foundPhoneNumber = await PhoneNumber.get<PhoneNumber>(phoneNumber.id);

    expect(foundPhoneNumber).toEqual(phoneNumber);
    expect(foundPhoneNumber.owner).toEqual(person);
  });

  it("saves the person and the phonenumber together", async () => {
    const person = new Person({ firstname: "Joe", lastname: "Bloggs" });

    const phoneNumber = new PhoneNumber({
      number: 555
    });
    phoneNumber.owner = person;
    await phoneNumber.save();

    const foundPerson = await Person.get<Person>(person.id);
    expect(foundPerson).toEqual(person);

    const foundPhoneNumber = await PhoneNumber.get<PhoneNumber>(phoneNumber.id);
    expect(foundPhoneNumber).toEqual(phoneNumber);
    expect(foundPhoneNumber.owner).toEqual(person);
  });
});

// yarn build && ../node_modules/jest/bin/jest.js manytoone.e2e.ts