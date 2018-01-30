module.exports = {
  name: 'credential',
  schema: 'public',
  columns: [{
      name: 'credential_id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'user_id',
      dataType: 'integer',
      notNull: true,
      references: {
        table: 'user',
        column: 'user_id'
      }
    }, {
      name: 'password',
      dataType: 'varchar(60)',
      notNull: true
    }, {
      name: 'active',
      dataType: 'boolean',
      notNull: true,
      default: true
    }, {
      name: 'created_on',
      dataType: 'TIMESTAMP WITH TIME ZONE',
      notNull: true
    }
  ],
  foreignKeys: [{
      schema: 'public',
      table: 'user',
      columns: ['user_id'],
      redColumns: ['user_id']
    }
  ]
}