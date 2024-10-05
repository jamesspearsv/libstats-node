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

  return rows;
}

async function selectAllFromTable(table) {
  const rows = db.select('*').from(table);
  return rows;
}

async function insertInteraction({ type, location, format }) {
  const now = new Date().toISOString();
  await db
    .insert({
      type_id: type,
      location_id: location,
      format_id: format,
      timestamp: now,
    })
    .into('interactions');
  return 1;
}

async function checkIfExists(table, id) {
  try {
    await db(table).where('id', id).first();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
};
