module.exports = {
  name: 'blogposttag',
  schema: 'public',
  columns: [{
      name: 'blogposttag_id',
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
      name: 'tag_id',
      dataType: 'integer',
      notNull: true,
      references: {
        table: 'tag',
        column: 'tag_id'
      }
    }
  ],
  foreignKeys: [{
      schema: 'public',
      table: 'blogpost',
      columns: ['blogpost_id'],
      redColumns: ['blogpost_id']
    }, {
      schema: 'public',
      table: 'tag',
      columns: ['tag_id'],
      redColumns: ['tag_id']
    }
  ]
}