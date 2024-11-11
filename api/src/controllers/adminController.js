/*
Middleware to handle actions requiring admin authorization
 */
const queries = require("../db/queries");
const { ResourceNotFoundError } = require("../lib/errorsClasses");

/*
TODO: Write admin middleware
- [x] get single row from table
- [x] get all rows from a table
- [ ] update single row in table
 */
async function rowGetById(req, res, next) {
  try {
    const table = req.table;
    const { id } = req.params;

    const row = await queries.selectRowFromTable(table, id);

    if (!row)
      return next(
        new ResourceNotFoundError(`No row in ${table} with id ${id}`),
      );

    res.json({ message: "ok", row });
  } catch (error) {
    return next(error);
  }
}

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

module.exports = { rowGetById, tableGet };
