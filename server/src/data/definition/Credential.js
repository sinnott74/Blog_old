module.exports = {
  name: 'credential',
  schema: 'public',
  columns: [{
      name: 'id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'user_id',
      dataType: 'integer',
      notNull: true
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
      refColumns: ['id']
    }
  ]
}