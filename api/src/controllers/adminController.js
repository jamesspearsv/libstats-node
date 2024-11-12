/*
Middleware to handle actions requiring admin authorization
 */
const queries = require("../db/queries");
const { BadRequestError } = require("../lib/errorsClasses");

/*
TODO: Write admin middleware
- [x] get single row from table
- [x] get all rows from a table
- [x] update single row in table
 */

// Get all rows from a given table
async function tableGet(req, res, next) {
  try {
    table = req.table;
    const rows =
      table === "interactions"
        ? await queries.selectInteractions()
        : await queries.selectAllFromTable(table);

    return res.json({ message: "ok", rows });
  } catch (error) {
    return next(error);
  }
}

// Access and return row by id
async function rowGetById(req, res, next) {
  try {
    const table = req.table;
    const { id } = req.params;

    const row = await queries.selectRowFromTable(table, id);
    console.log(row);

    // throw error if no row found
    if (!row)
      return next(new BadRequestError(`No row in ${table} with id ${id}`));

    res.json({ message: "row found", row });
  } catch (error) {
    return next(error);
  }
}

// Update row by id
async function updateRowById(req, res, next) {
  try {
    const table = req.table;
    const id = req.params.id;
    const data = req.body;

    const row = await queries.updateRowFromTable(table, id, data);

    // throw error is no row found
    if (row.length < 1)
      return next(new BadRequestError(`No row in ${table} with id ${id}`));

    return res.json({ message: "row updated", row });
  } catch (error) {
    return next(error);
  }
}

async function addNewRow(req, res, next) {
  try {
    const table = req.table;
    const newRow = req.body;

    if (!newRow) return next(new BadRequestError("Malformed request"));

    await queries.insertRow(table, newRow);

    return res.json({ message: "New row added" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { rowGetById, tableGet, updateRowById, addNewRow };
