const db = require('./connection');

async function selectInteractions() {
  const rows = await db
    .select(
      'interactions.id',
      'types.value as type',
      'locations.value as location',
      'formats.value as format',
      'timestamp'
    )
    .from('interactions')
    .join('types', 'interactions.type_id', '=', 'types.id')
    .join('locations', 'interactions.location_id', '=', 'locations.id')
    .join('formats', 'interactions.format_id', '=', 'formats.id');

  console.log(rows);

  return rows;
}

async function selectAllFromTable(table) {
  const rows = db.select('*').from(table);
  return rows;
}

module.exports = { selectInteractions, selectAllFromTable };
