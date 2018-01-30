module.exports = {
  name: 'blogpostcomment',
  schema: 'public',
  columns: [{
      name: 'blogpostcomment_id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'blogpost_id',
      dataType: 'integer',
      notNull: true,
      references: {
        table: 'blogpost',
        column: 'blogpost_id'
      }
    }, {
      name: 'user_id',
      dataType: 'integer',
      notNull: true,
      references: {
        table: 'user',
        column: 'user_id'
      }
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
      redColumns: ['user_id']
    }, {
      schema: 'public',
      table: 'blogpost',
      columns: ['blogpost_id'],
      redColumns: ['blogpost_id']
    }
  ]
}