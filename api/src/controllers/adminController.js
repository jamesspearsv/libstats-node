/* Middleware to handle actions requiring admin authorization */
const queries = require("../db/queries");
const { BadRequestError } = require("../lib/errorsClasses");
const { countInteractionsAdmin } = require("../db/queries");

// Get all rows from a given table
async function tableGet(req, res, next) {
  try {
    table = req.table;
    const rows = await queries.selectAllFromTable(table);

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

    // throw error if no row found
    if (!row)
      return next(new BadRequestError(`No row in ${table} with id ${id}`));

    res.json({ message: "Row found", row });
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

    return res.json({ message: "Row updated", row });
  } catch (error) {
    return next(error);
  }
}

// Add new row to given table
async function addNewRow(req, res, next) {
  try {
    const table = req.table;
    const newRow = req.body;

    if (!newRow) return next(new BadRequestError("No data provided"));

    const row = await queries.insertRow(table, newRow);

    return res.json({ message: "New row added", row });
  } catch (error) {
    return next(error);
  }
}

// Get all time counts of interactions
async function statsGet(req, res, next) {
  try {
    const [count_total, count_type, count_location, count_format] =
      await Promise.all([
        await queries.countRowsInTable("interactions"),
        await queries.countAllInteractionByGroup("type"),
        await queries.countAllInteractionByGroup("location"),
        await queries.countAllInteractionByGroup("format"),
      ]);

    return res.json({
      message: "ok",
      count_total,
      count_type,
      count_location,
      count_format,
    });
  } catch (error) {
    return next(error);
  }
}

async function interactionsGet(req, res, next) {
  try {
    const { page, limit } = req.query;

    if (!limit || !page) {
      throw new BadRequestError("No page or limit provided");
    } else if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
      throw new BadRequestError("Limit and page must be integers");
    }

    const offset = parseInt(page) * parseInt(limit);

    const [total_rows, rows] = await Promise.all([
      queries.countRowsInTable("interactions"),
      queries.selectInteractions(limit, offset),
    ]);

    res.json({ message: "ok", total_rows, rows });
  } catch (error) {
    return next(error);
  }
}

async function countTable(req, res, next) {
  try {
    const table = req.url.split("/")[2];
    const total_rows = await queries.countRowsInTable(table);
    res.json({ message: "ok", total_rows });
  } catch (error) {
    return next(error);
  }
}

async function reportGet(req, res, next) {
  try {
    const { start, end } = req.query;
    if (!start || !end) throw new BadRequestError("No start or end provided");

    // search database for counts of total interaction and counts of categories
    const [total_interactions, type_count, location_count, format_count] =
      await Promise.all([
        countInteractionsAdmin(start, end),
        queries.countInteractionByCategoryAdmin(start, end, "type"),
        queries.countInteractionByCategoryAdmin(start, end, "location"),
        queries.countInteractionByCategoryAdmin(start, end, "format"),
      ]);

    // todo: add queries for counts grouped by month

    res.json({
      message: "ok",
      total_interactions,
      type_count,
      location_count,
      format_count,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  rowGetById,
  tableGet,
  updateRowById,
  addNewRow,
  statsGet,
  interactionsGet,
  countTable,
  reportGet,
};
