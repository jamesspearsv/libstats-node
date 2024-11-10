/*
Middleware to handle actions not requiring admin authorization
 */

const queries = require("../db/queries");
const { BadRequestError } = require("../lib/errorsClasses");

// get all rows from types, locations, and formats tables
async function optionsGet(req, res, next) {
  try {
    [types, locations, formats] = await Promise.all([
      queries.selectAllFromTable("types"),
      queries.selectAllFromTable("locations"),
      queries.selectAllFromTable("formats"),
    ]);

    return res.json({
      message: "ok",
      types,
      locations,
      formats,
    });
  } catch (error) {
    return next(error);
  }
}

async function recordPost(req, res, next) {
  const { type, location, format } = req.body;

  // Introduce timeout so client animation can play
  setTimeout(async () => {
    try {
      // Check that body contains only valid keys
      const checks = Object.keys(req.body).map(async (key) => {
        return await queries.checkIfExists(`${key}s`, req.body[key]);
      });
      const results = await Promise.all(checks);
      if (results.includes(false))
        return next(new BadRequestError("Invalid options"));

      // If valid body insert interaction into db
      await queries.insertInteraction(type, location, format);

      return res.json({ message: "data added" });
    } catch (error) {
      return next(error);
    }
  }, 500);
}

async function reportGet(req, res, next) {
  // get interactions from db between date range
  try {
    // parse incoming query
    const { start, end, location } = req.query;

    // check that location is valid
    const check = await queries.checkIfExists("locations", location);
    if (!check) return next(new BadRequestError("Invalid location"));

    const [rows, count_days, count_type, count_format, count_total] =
      await Promise.all([
        queries.selectInteractionsInRange(start, end, location),
        queries.countInteractionsByDay(start, end, location),
        queries.countInteractionsByCategory(start, end, location, "type"),
        queries.countInteractionsByCategory(start, end, location, "format"),
        queries.countInteractionsInRange(start, end, location),
      ]);

    return res.json({
      message: "ok",
      rows,
      count_total,
      count_format,
      count_type,
      count_days,
    });
  } catch (error) {
    return next(error);
  }
}

async function summaryGet(req, res, next) {
  try {
    const count_month = await queries.countInteractionsThisMonth();
    return res.json({ message: "ok", count_month });
  } catch (error) {
    return next(error);
  }
}

// Get all rows from a given table
async function tableGet(req, res, next) {
  try {
    const table = req.params.table;

    const rows =
      table === "interactions"
        ? await queries.selectInteractions()
        : await queries.selectAllFromTable(table);

    return res.json({ message: "ok", rows });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  optionsGet,
  recordPost,
  reportGet,
  summaryGet,
  tableGet,
};
