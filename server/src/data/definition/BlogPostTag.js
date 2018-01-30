module.exports = {
  name: 'blogposttag',
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
      name: 'tag_id',
      dataType: 'integer',
      notNull: true
    }
  ],
  foreignKeys: [{
      schema: 'public',
      table: 'blogpost',
      columns: ['blogpost_id'],
      refColumns: ['id']
    }, {
      schema: 'public',
      table: 'tag',
      columns: ['tag_id'],
      refColumns: ['id']
    }
  ]
}