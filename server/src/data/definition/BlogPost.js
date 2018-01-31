module.exports = {
  name: 'blogpost',
  schema: 'public',
  columns: [{
      name: 'id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'title',
      dataType: 'varchar(255)',
      notNull: true
    }, {
      name: 'text',
      dataType: 'text',
      notNull: true
    }, {
      name: 'user_id',
      dataType: 'integer',
      notNull: true
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