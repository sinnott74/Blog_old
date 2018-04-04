import ORM from "sinnott-orm";
const DataTypes = ORM.DataTypes;

const User = ORM.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      length: 30,
      notNull: true,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      length: 30,
      notNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      length: 30,
      notNull: true
    },
    dob: {
      type: DataTypes.TIMESTAMP,
      notNull: true
    }
  },
  {
    customAttributes: {
      fullname: {
        get: function() {
          return `${this.firstname} ${this.lastname}`;
        }
      }
    }
  }
);

User.isUsernameAvailable = async function(username: string) {
  let count = await User.count({ username });
  if (count > 0) {
    return false;
  }
  return true;
};

User.readByUsername = async function(username: string) {
  return User.findOne({ username: username });
};

export default User;
