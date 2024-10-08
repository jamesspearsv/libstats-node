const db = require('./connection');

async function selectInteractions() {
  const rows = await db
    .select(
      'interactions.id',
      'types.value as type',
      'locations.value as location',
      'formats.value as format',
      'date'
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
    const date = new Date();

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const today = `${year}-${month}-${day}`;
    // console.log('today:', today);

    await db
      .insert({
        type_id: type,
        location_id: location,
        format_id: format,
        date: today,
      })
      .into('interactions');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// return boolean value if id exists in table
async function checkIfExists(table, id) {
  const row = await db(table).where('id', id).first();
  return !!row;
}

async function selectInteractionsInRange(start, end, location_id) {
  // console.log('start:', start);
  // console.log('end: ', end);
  // console.log('location_id', location_id);

  const rows = await db('interactions')
    .select(
      'interactions.id',
      'types.value as type',
      'locations.value as location',
      'formats.value as format',
      'date'
    )
    .join('types', 'interactions.type_id', '=', 'types.id')
    .join('locations', 'interactions.location_id', '=', 'locations.id')
    .join('formats', 'interactions.format_id', '=', 'formats.id')
    .whereBetween('date', [start, end])
    .andWhere('location_id', location_id);

  return rows;
}

async function countInteractionsInRange(start, end, location_id, category) {
  // count interaction and group by category
  const types = await db('interactions')
    .select(`${category}s.id`, `${category}s.value`)
    .count('interactions.id as number_of_interactions')
    .join(`${category}s`, `interactions.${category}_id`, `${category}s.id`)
    .whereBetween('interactions.date', [start, end])
    .andWhere('interactions.location_id', location_id)
    .groupBy(`${category}s.value`);

  return types;
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countInteractionsInRange,
};
