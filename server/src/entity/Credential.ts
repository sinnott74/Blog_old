import {
  Entity,
  Column,
  BaseModel,
  ManyToOne,
  STRING,
  TIMESTAMP
} from "sinnott-orm-typed";
import User from "./User";
import * as bcrypt from "bcryptjs";

@Entity()
export default class Credential extends BaseModel {
  @Column({ type: STRING, notNull: true, length: 60 })
  password: string;

  @Column({ notNull: true })
  active: boolean;

  @Column({ type: TIMESTAMP, notNull: true })
  created_on: Date;

  @ManyToOne({ type: () => User })
  user: User;

  async beforeCreate() {
    await Credential.deactivePreviousCredential(this);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.active = true;
    this.created_on = new Date();
  }

  /**
   * Deactivates a user's active password
   */
  private static async deactivePreviousCredential(credential: Credential) {
    const previousCredential = await Credential.readActiveUserCredentialByUserID(
      credential.user_id
    );
    if (previousCredential) {
      previousCredential.active = false;
      await previousCredential.save();
    }
  }

  /**
   * Reads active credential by user ID
   * @param  user_id
   * @returns  A credential or undefined
   */
  static async readActiveUserCredentialByUserID(user_id: number) {
    return Credential.findAtMostOne<Credential>({ user_id, active: true });
  }

  /**
   * Reads a Credential & its user, but the user's username.
   * @param  username   User's username
   * @returns
   */
  static async readActiveUserCredentialByUsername(username: string) {
    return Credential.findOne<Credential>(
      { active: true, username: username },
      { includes: ["user"] }
    );
  }

  /**
   * Checks if a username & passward match
   * @param {*} username    User's username
   * @param {*} password    User's active credenial password
   * @return {Promise<Boolean>} which resolves to true
   *   if the username/password combination are authentic,
   *   false otherwise
   */
  static async authenticate(username: string, password: string) {
    const userCredential = await Credential.readActiveUserCredentialByUsername(
      username
    );
    return bcrypt.compare(password, userCredential.password);
  }
}
