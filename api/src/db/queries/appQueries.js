const db = require("../connection");
const { getDateToday } = require("../../lib/dates");
const { DatabaseError } = require("../../lib/errorsClasses");

// Select all columns from given table
async function selectAllFromTable(table) {
  try {
    return await db(table).select("*");
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Insert interaction into interactions table
async function insertInteraction(type, location, format) {
  try {
    await db("interactions").insert({
      type_id: type,
      location_id: location,
      format_id: format,
      date: getDateToday(),
    });
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Return boolean value if id exists in a given table
async function checkIfExists(table, id) {
  const row = await db(table).where("id", id).first();
  return !!row;
}

// select interaction filtered by a given date range and location id
async function selectInteractionsInRange(start, end, location_id) {
  try {
    return await db("interactions")
      .select(
        "interactions.id",
        "types.value as type",
        "locations.value as location",
        "formats.value as format",
        "date",
      )
      .join("types", "interactions.type_id", "=", "types.id")
      .join("locations", "interactions.location_id", "=", "locations.id")
      .join("formats", "interactions.format_id", "=", "formats.id")
      .whereBetween("date", [start, end])
      .andWhere("interactions.location_id", location_id);
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count total number of interactions in a given date range at a given location
async function countInteractionsInRange(start, end, location_id) {
  try {
    const count = await db("interactions")
      .select("*")
      .count("interactions.id as number_of_interactions")
      .join("locations", "interactions.location_id", "=", "locations.id")
      .whereBetween("date", [start, end])
      .andWhere("interactions.location_id", location_id)
      .first();

    return count.number_of_interactions;
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count number of interaction in a given date range grouped by category (i.e. type or format)
async function countInteractionsByCategory(start, end, location_id, category) {
  try {
    return await db(`${category}s`)
      .select(`${category}s.id`, `${category}s.value`)
      .count("interactions.id as number_of_interactions")
      .leftJoin("interactions", function () {
        this.on(`interactions.${category}_id`, "=", `${category}s.id`)
          .andOn(
            "interactions.location_id",
            "=",
            db.raw(":location_id", { location_id }),
          )
          .andOnBetween("interactions.date", [start, end]);
      })
      .groupBy(`${category}s.id`);
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count number of interaction per day in a given date range and at a given location
async function countInteractionsByDay(start, end, location) {
  try {
    return await db.raw(
      `WITH RECURSIVE date_range AS (
        SELECT DATE(:start) AS date
        UNION ALL
        SELECT DATE(date, '+1 day')
        FROM date_range
        WHERE date < DATE(:end)
      )
      SELECT dr.date, 
             COUNT(i.id) AS number_of_interactions
      FROM date_range dr
      LEFT JOIN interactions i 
        ON dr.date = i.date 
        AND i.location_id = :location
      GROUP BY dr.date
      ORDER BY dr.date ASC;
    `,
      { start, end, location },
    );
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count total number interaction in the current month
async function countInteractionsThisMonth() {
  try {
    const row = await db("interactions")
      .select("*")
      .count("interactions.id as number_of_interactions")
      .whereRaw("strftime('%Y-%m', date) = strftime('%Y-%m', 'now')")
      .first();
    return row.number_of_interactions;
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

module.exports = {
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countInteractionsInRange,
  countInteractionsByCategory,
  countInteractionsByDay,
  countInteractionsThisMonth,
};
