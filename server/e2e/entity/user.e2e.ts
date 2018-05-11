import { init, transaction, end } from "sinnott-orm-typed";
import User from "../../dist/entity/User";
import dbConfig from "../../dist/config/databaseConfig";
import { v4 as uuidV4 } from "uuid";

beforeAll(async () => {
  await init(dbConfig);
});

afterAll(end);

describe("User", () => {
  it("can be saved and read back by its username", async () => {
    await transaction(async () => {
      const userDtls = {
        username: uuidV4().substring(30),
        firstname: "Joe",
        lastname: "Bloggs",
        dob: new Date()
      };
      const user = new User(userDtls);
      await user.save();

      const foundUser = await User.readByUsername(userDtls.username);
      expect(foundUser).toEqual(user);
    });
  });

  it("can check is a username is available", async () => {
    await transaction(async () => {
      const userDtls = {
        username: uuidV4().substring(30),
        firstname: "Joe",
        lastname: "Bloggs",
        dob: new Date()
      };

      const user = new User(userDtls);
      await user.save();

      const isUsernameAvailable = await User.isUsernameAvailable(
        userDtls.username
      );
      expect(isUsernameAvailable).toBeFalsy();
    });
  });

  it("throws if the username is already taken", async () => {
    expect(
      transaction(async () => {
        const userDtls = {
          username: uuidV4().substring(30),
          firstname: "Joe",
          lastname: "Bloggs",
          dob: new Date()
        };

        const user = new User(userDtls);
        await user.save();

        const userWithSameUsername = new User(userDtls);
        await userWithSameUsername.save();
      })
    ).rejects.toThrow("Duplicate username");
  });
});

// yarn build && ../node_modules/jest/bin/jest.js user.e2e.ts
