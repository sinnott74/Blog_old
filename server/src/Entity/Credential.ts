import ORM from "sinnott-orm";
import User from "./User";
import * as bcrypt from "bcryptjs";
const DataTypes = ORM.DataTypes;

const Credential = ORM.define("credential", {
  password: {
    type: DataTypes.STRING,
    length: 60,
    notNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    notNull: true,
    default: true
  },
  created_on: {
    type: DataTypes.TIMESTAMP,
    notNull: true,
    default: new Date()
  }
});

User.oneToMany(Credential);

/**
 * Deactivates a users previouslt active credential & encrypts the password
 * @param {Model} credential
 */
Credential.beforeCreate = async function() {
  await Credential._deactivePreviousCredential(this);

  let salt = await bcrypt.genSalt();
  let hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  this.active = true;
  this.created_on = new Date();
};

/**
 * Deactivates a user's active password
 */
Credential._deactivePreviousCredential = async function(credential) {
  let previousCredential = await Credential.readActiveUserCredentialByUserID(
    credential.user_id
  );
  if (previousCredential) {
    previousCredential.active = false;
    await previousCredential.save();
  }
};

/**
 * Checks if a username & passward match
 * @param {*} username    User's username
 * @param {*} password    User's active credenial password
 * @return {Promise<Boolean>} which resolves to true
 *   if the username/password combination are authentic,
 *   false otherwise
 */
Credential.authenticate = async function(username: string, password: string) {
  let userCredential = await Credential.readActiveUserCredentialByUsername(
    username
  );
  return bcrypt.compare(password, userCredential.password);
};

/**
 * Reads active credential by user ID
 * @param {*} user_id
 * @returns {Promise<Credential>} A credential or undefined
 */
Credential.readActiveUserCredentialByUserID = async function(user_id: number) {
  return Credential.findAtMostOne({ user_id, active: true });
};

/**
 * Reads a Credential & its user, but the user's username.
 * @param {String} username   User's username
 * @returns {Promise<Credential>}
 */
Credential.readActiveUserCredentialByUsername = async function(
  username: string
) {
  return Credential.findOne(
    { active: true, username: username },
    { includes: ["user"] }
  );
};

export default Credential;
