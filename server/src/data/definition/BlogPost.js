module.exports = {
  name: 'blogpost',
  schema: 'public',
  columns: [{
      name: 'blogpost_id',
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
      notNull: true,
      references: {
        table: 'user',
        column: 'user_id'
      }
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