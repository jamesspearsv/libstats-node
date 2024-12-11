/* Middleware to handle actions requiring admin authorization */
const queries = require("../db/queries/adminQueries");
const { selectAllFromTable } = require("../db/queries/appQueries");
const { BadRequestError } = require("../lib/errorsClasses");
const parseMonthRange = require("../lib/parseMonthRange");

// Get all rows from a given table
async function tableGet(req, res, next) {
  try {
    table = req.table;
    const rows = await selectAllFromTable(table);

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

    return res.json({ message: "ok", total_rows, rows });
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

async function adminReportGet(req, res, next) {
  try {
    const { startMonth, endMonth, category } = req.query;
    if (!startMonth || !endMonth || !category) {
      throw new BadRequestError("Start, end, and category must be provided");
    }

    if (!["type", "location", "format"].includes(category)) {
      throw new BadRequestError("Invalid category provided");
    }

    // query database for cumulative interactions counts during range
    const total_interactions = await queries.countInteractionsAdmin(
      startMonth,
      endMonth,
    );
    const total_detailed = await queries.countInteractionByCategoryAdmin(
      startMonth,
      endMonth,
      category,
    );

    // parse range between start and end month
    const range = parseMonthRange(startMonth, endMonth);
    const monthly_details = [];
    // query database for each month in range
    for (const month of range) {
      const rows = await queries.countInteractionsByCategoryByMonth(
        month,
        category,
      );

      const monthObject = {
        month,
      };

      // push data from each row to new formatted object
      for (const row of rows) {
        monthObject[row.value] = row.number_of_interactions;
      }

      // push month object to monthly_details array
      monthly_details.push(monthObject);
    }

    res.json({
      message: "ok",
      range,
      total_interactions,
      total_detailed,
      monthly_details,
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
  adminReportGet,
};
