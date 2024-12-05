const db = require("./connection");
const { getDateToday } = require("../lib/dates");
const { DatabaseError } = require("../lib/errorsClasses");

async function selectInteractions(limit, offset) {
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
      .limit(limit)
      .offset(offset);
  } catch (error) {
    throw DatabaseError(error.message);
  }
}

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

// Select row by id from a given table
async function selectRowFromTable(table, id) {
  try {
    return await db(table).select("*").where("id", id).first();
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Update row by id from a given table
async function updateRowFromTable(table, id, values) {
  try {
    const rows = await db(table).where("id", id).update(values, ["*"]);
    return rows[0];
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Insert new row into specified table
async function insertRow(table, row) {
  try {
    const rows = await db(table).insert(row, ["*"]);
    return rows[0];
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count all rows in interactions table
async function countAllInteractions() {
  try {
    const count = await db("interactions")
      .count("interactions.id as total")
      .first();

    return count.total;
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

// Count rows in interaction grouped by a given group
async function countAllInteractionByGroup(group) {
  try {
    return await db(`${group}s`)
      .select(`${group}s.id`, `${group}s.value`)
      .count("interactions.id as total_interactions")
      .leftJoin("interactions", `${group}s.id`, "=", `interactions.${group}_id`)
      .groupBy(`${group}s.id`);
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

async function countRowsInTable(table) {
  try {
    const rows = await db.raw(`SELECT COUNT(id) AS total_rows FROM  :table:`, {
      table,
    });

    return rows[0].total_rows;
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

async function countInteractionsAdmin(start, end) {
  const rows = await db("interactions")
    .count("* as total_interactions")
    .whereRaw("strftime('%Y-%m', date) BETWEEN" + " :start AND :end", {
      start,
      end,
    })
    .first();

  return rows.total_interactions;
}

async function countInteractionByCategoryAdmin(start, end, category) {
  const table = `${category}s`;

  const rows = await db(table)
    .select(`${table}.id`, `${table}.value`)
    .count("interactions.id as number_of_interactions")
    .leftJoin("interactions", `${table}.id`, `interactions.${category}_id`)
    .whereRaw("strftime('%Y-%m', date) BETWEEN :start AND :end", { start, end })
    .groupBy(`${table}.id`);
  return rows;
}

async function countInteractionsByCategoryByMonth(month, category) {
  try {
    const table = `${category}s`;

    // TODO: refactor to use knex.raw

    const rows = await db(table)
      .select(`${table}.id`, `${table}.value`)
      .count("interactions.id as" + " number_of_interactions")
      .leftJoin("interactions", function () {
        this.on(`${table}.id`, "=", `interactions.${category}_id`).andOn(
          `strftime('%Y-%m, interactions.date)`,
          "=",
          month,
        );
      })
      .groupBy(`${table}.id`);

    return rows;
  } catch (error) {
    console.error(error);
    throw new DatabaseError(error.message);
  }
}

module.exports = {
  selectInteractions,
  selectAllFromTable,
  insertInteraction,
  checkIfExists,
  selectInteractionsInRange,
  countInteractionsInRange,
  countInteractionsByCategory,
  countInteractionsByDay,
  countInteractionsThisMonth,
  selectRowFromTable,
  updateRowFromTable,
  insertRow,
  countAllInteractionByGroup,
  countRowsInTable,
  countInteractionsAdmin,
  countInteractionByCategoryAdmin,
  countInteractionsByCategoryByMonth,
};
