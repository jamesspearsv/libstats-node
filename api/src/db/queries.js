const db = require('./connection');
const { getDateToday } = require('../helpers.js');

async function selectInteractions() {
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
    .join('formats', 'interactions.format_id', '=', 'formats.id');

  return rows;
}

// utiliity query to select all columns from specifie table
async function selectAllFromTable(table) {
  const rows = db.select('*').from(table);
  return rows;
}

// Insert interaction into interactions table
async function insertInteraction(type, location, format) {
  try {
    await db('interactions').insert({
      type_id: type,
      location_id: location,
      format_id: format,
      date: getDateToday(),
    });

    return true;
  } catch (error) {
    return error(error);
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
      .andWhere('interactions.location_id', location_id);

    return rows;
  } catch (error) {
    return error;
  }
}

async function countAllInteractionsInRange(start, end, location_id) {
  // Count total number of interactions in a given date range at a given location
  try {
    const count = await db('interactions')
      .count('interactions.id as number_of_interactions')
      .join('locations', 'interactions.location_id', '=', 'locations.id')
      .whereBetween('date', [start, end])
      .andWhere('interactions.location_id', location_id)
      .first();

    return count.number_of_interactions;
  } catch (error) {
    return error;
  }
}

async function countInteractionsInRange(start, end, location_id, category) {
  // Count number of interaction in a given date range grouped by category (i.e. type or format)
  try {
    const rows = await db(`${category}s`)
      .select(`${category}s.id`, `${category}s.value`)
      .count('interactions.id as number_of_interactions')
      .leftJoin('interactions', function () {
        this.on(`interactions.${category}_id`, '=', `${category}s.id`)
          .andOn('interactions.location_id', '=', db.raw('?', [location_id]))
          .andOnBetween('interactions.date', [start, end]);
      })
      .groupBy(`${category}s.id`);

    return rows;
  } catch (error) {
    return error;
  }
}

async function countByDay(start, end, location) {
  try {
    const startDate = start; //'2024-10-01'; // Example start date
    const endDate = end; //'2024-10-07'; // Example end date
    const locationId = location;

    // Query the datebase for the total number of interactions per day
    // in a given date range and at a given location.
    const rows = await db.raw(
      `WITH RECURSIVE date_range AS (
        SELECT DATE(?) AS date
        UNION ALL
        SELECT DATE(date, '+1 day')
        FROM date_range
        WHERE date < DATE(?)
      )
      SELECT dr.date, 
             COUNT(i.id) AS number_of_interactions
      FROM date_range dr
      LEFT JOIN interactions i 
        ON dr.date = i.date 
        AND i.location_id = ?
      GROUP BY dr.date
      ORDER BY dr.date ASC;
    `,
      [startDate, endDate, locationId]
    );

    // console.log(rows);
    return rows;
  } catch (error) {
    return error;
  }
}

async function countInteractionsThisMonth() {
  // count total interaction in the current month
  try {
    const row = await db('interactions')
      .count('interactions.id as number_of_interactions')
      .whereRaw("strftime('%Y-%m', date) = strftime('%Y-%m', 'now')")
      .first();

    return row.number_of_interactions;
  } catch (error) {
    return error;
  }
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countAllInteractionsInRange,
  countInteractionsInRange,
  countByDay,
  countInteractionsThisMonth,
};
