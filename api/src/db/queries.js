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

// utiliity query to select all columns from specifie table
async function selectAllFromTable(table) {
  const rows = db.select('*').from(table);
  return rows;
}

// Insert interaction into interactions table
async function insertInteraction({ type, location, format }) {
  try {
    const now = new Date().toISOString();
    await db
      .insert({
        type_id: type,
        location_id: location,
        format_id: format,
        timestamp: now,
      })
      .into('interactions');
    return true;
  } catch (error) {
    return false;
  }
}

// return boolean value if id exists in table
async function checkIfExists(table, id) {
  console.log(table, id);
  const row = await db(table).where('id', id).first();
  return !!row;
}

async function selectInteractionsInRange(start, end, location_id) {
  console.log('start:', start);
  console.log('end: ', end);
  console.log('location_id', location_id);

  const rows = await db('interactions')
    .select(
      'interactions.id',
      'types.value as type',
      'locations.value as location',
      'formats.value as format',
      'timestamp'
    )
    .join('types', 'interactions.type_id', '=', 'types.id')
    .join('locations', 'interactions.location_id', '=', 'locations.id')
    .join('formats', 'interactions.format_id', '=', 'formats.id')
    .whereBetween('timestamp', [start, end])
    .where('location_id', location_id);

  return rows;
}

async function countInteractionsInRange(start, end, location_id) {
  // do some stuff
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countInteractionsInRange,
};
