module.exports = {
  name: 'blogpostcomment',
  schema: 'public',
  columns: [{
      name: 'id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'blogpost_id',
      dataType: 'integer',
      notNull: true
    }, {
      name: 'user_id',
      dataType: 'integer',
      notNull: true
    }, {
      name: 'comment',
      dataType: 'text',
      notNull: true
    }
  ],
  foreignKeys: [{
      schema: 'public',
      table: 'user',
      columns: ['user_id'],
      redColumns: ['id']
    }, {
      schema: 'public',
      table: 'blogpost',
      columns: ['blogpost_id'],
      redColumns: ['id']
    }
  ]
}