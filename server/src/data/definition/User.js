module.exports = {
  name: 'user',
  schema: 'public',
  columns: [{
      name: 'id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'username',
      dataType: 'varchar(30)',
      unique: true,
      notNull: true
    }, {
      name: 'password',
      dataType: 'varchar(60)',
      notNull: true
    }, {
      name: 'firstname',
      dataType: 'varchar(30)',
      notNull: true
    }, {
      name: 'lastname',
      dataType: 'varchar(30)',
      notNull: true
    }, {
      name: 'dob',
      dataType: 'Date',
      notNull: true
    }
  ],
  indexes: {
    idx_username: ['username']
  }
}