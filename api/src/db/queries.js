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

  try {
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
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function countInteractionsInRange(start, end, location_id, category) {
  try {
    // count interaction and group by category
    const rows = await db('interactions')
      .select(`${category}s.id`, `${category}s.value`)
      .count('interactions.id as number_of_interactions')
      .join(`${category}s`, `interactions.${category}_id`, `${category}s.id`)
      .whereBetween('interactions.date', [start, end])
      .andWhere('interactions.location_id', location_id)
      .groupBy(`${category}s.value`);

    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function countByDay(start, end, location) {
  try {
    const startDate = start; //'2024-10-01'; // Example start date
    const endDate = end; //'2024-10-07'; // Example end date

    // Query the datebase for the total number of interactions per day
    // in a given date range and at a given location. Limited to 100
    const rows = await db.raw(
      `
      WITH date_range AS (
        SELECT DATE(DATE(?) , '+' || (n - 1) || ' days') as date
        FROM (
          SELECT ROW_NUMBER() OVER () AS n
          FROM sqlite_master
          LIMIT 100
        )
        WHERE DATE(DATE(?) , '+' || (n - 1) || ' days') <= DATE(?)
      )
      SELECT IFNULL(interaction_counts.number_of_interactions, 0) as number_of_interactions, date_range.date
      FROM date_range
      LEFT JOIN (
        SELECT COUNT(*) as number_of_interactions, DATE(date) as date
        FROM interactions
        WHERE DATE(date) BETWEEN ? AND ?
        AND location_id = ? -- Moved location_id filter here
        GROUP BY DATE(date)
      ) as interaction_counts
      ON date_range.date = interaction_counts.date;
      `,
      [startDate, startDate, endDate, startDate, endDate, location]
    );

    return rows;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countInteractionsInRange,
  countByDay,
};
