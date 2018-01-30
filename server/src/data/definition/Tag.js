module.exports = {
  name: 'tag',
  schema: 'public',
  columns: [{
      name: 'tag_id',
      dataType: 'serial',
      primaryKey: true,
      notNull: true
    }, {
      name: 'value',
      dataType: 'varchar(255)',
      notNull: true
    }
  ]
}