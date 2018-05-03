import {
  Entity,
  Column,
  DerivedColumn,
  BaseModel,
  STRING,
  TIMESTAMP
} from "sinnott-orm-typed";
import InformationalException from "../exception/InformationalException";

@Entity()
export default class User extends BaseModel {
  @Column({ type: STRING, notNull: true, length: 30 })
  username: string;

  @Column({ type: STRING, notNull: true, length: 30 })
  firstname: string;

  @Column({ type: STRING, notNull: true, length: 30 })
  lastname: string;

  @Column({ type: TIMESTAMP, notNull: true })
  dob: Date;

  @DerivedColumn({
    get: function() {
      return `${this.firstname} ${this.lastname}`;
    }
  })
  fullname: string;

  async beforeSave() {
    const isUsernameAvailable = await User.isUsernameAvailable(this.username);
    if (!isUsernameAvailable) {
      throw new InformationalException("Duplicate username");
    }
  }

  /**
   * Checks if a username hasn't already been taken
   * @param username
   */
  static async isUsernameAvailable(username: string) {
    const count = await User.count({ username });
    return !(count > 0);
  }

  /**
   * Reads a User by their username
   * @param username
   */
  static async readByUsername(username: string) {
    return User.findOne<User>({ username: username });
  }
}
