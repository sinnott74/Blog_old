module.exports = {
  name: 'user',
  schema: 'public',
  columns: [{
      name: 'user_id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'username',
      dataType: 'varchar(30)',
      unique: true,
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
      dataType: 'TIMESTAMP WITH TIME ZONE',
      notNull: true
    }
  ],
  indexes: {
    idx_username: ['username']
  }
}