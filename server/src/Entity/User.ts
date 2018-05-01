// import ORM from "sinnott-orm";
// const DataTypes = ORM.DataTypes;

// const User = ORM.define(
//   "user",
//   {
//     username: {
//       type: DataTypes.STRING,
//       length: 30,
//       notNull: true,
//       unique: true
//     },
//     firstname: {
//       type: DataTypes.STRING,
//       length: 30,
//       notNull: true
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       length: 30,
//       notNull: true
//     },
//     dob: {
//       type: DataTypes.TIMESTAMP,
//       notNull: true
//     }
//   },
//   {
//     customAttributes: {
//       fullname: {
//         get: function() {
//           return `${this.firstname} ${this.lastname}`;
//         }
//       }
//     }
//   }
// );

// User.isUsernameAvailable = async function(username: string) {
//   let count = await User.count({ username });
//   if (count > 0) {
//     return false;
//   }
//   return true;
// };

// User.readByUsername = async function(username: string) {
//   return User.findOne({ username: username });
// };

// export default User;

import {
  Entity,
  Column,
  DerivedColumn,
  BaseModel,
  STRING,
  TIMESTAMP
} from "sinnott-orm-typed";
// const DataTypes = ORM.DataTypes;

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

  static async isUsernameAvailable(username: string) {
    const count = await User.count({ username });
    return !(count > 0);
  }

  static async readByUsername(username: string) {
    return User.findOne<User>({ username: username });
  }
}
