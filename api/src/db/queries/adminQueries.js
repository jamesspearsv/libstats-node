const db = require("../connection");
const { DatabaseError } = require("../../lib/errorsClasses");

// select paginated subsection of interactions table
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
    .whereRaw("strftime('%Y-%m', date) BETWEEN :start AND :end", {
      start,
      end,
    })
    .first();

  return rows.total_interactions;
}

async function countInteractionByCategoryAdmin(start, end, category) {
  const table = `${category}s`;

  const row = await db(table)
    .select(`${table}.id`, `${table}.value`)
    .count("interactions.id as number_of_interactions")
    .leftJoin("interactions", `${table}.id`, `interactions.${category}_id`)
    .whereRaw("strftime('%Y-%m', date) BETWEEN :start AND :end", { start, end })
    .groupBy(`${table}.id`);

  const rows = await db(table)
    .select(`${table}.id`, `${table}.value`)
    .count("interactions.id as number_of_interactions")
    .leftJoin(
      db.raw(
        "interactions ON ??=?? AND strftime('%Y-%m', interactions.date) BETWEEN ? AND ?",
        [`${table}.id`, `interactions.${category}_id`, start, end],
      ),
    )
    .groupBy(`${table}.id`);

  return rows;
}

async function countInteractionsByCategoryByMonth(month, category) {
  try {
    const table = `${category}s`;

    return await db(table)
      .select(`${table}.id`, `${table}.value`)
      .count("interactions.id as number_of_interactions")
      .leftJoin(
        db.raw(
          "interactions ON ??=?? AND strftime('%Y-%m', interactions.date)=?",
          [`interactions.${category}_id`, `${table}.id`, month],
        ),
      )
      .groupBy(`${table}.id`);
  } catch (error) {
    throw new DatabaseError(error.message);
  }
}

module.exports = {
  selectInteractions,
  selectRowFromTable,
  updateRowFromTable,
  insertRow,
  countAllInteractionByGroup,
  countRowsInTable,
  countInteractionsAdmin,
  countInteractionByCategoryAdmin,
  countInteractionsByCategoryByMonth,
};
