const queries = require("../db/queries");
const { BadRequestError } = require("../lib/errorsClasses");

// Select all interactions from db
async function interactionsGet(req, res, next) {
  try {
    const data = await queries.selectInteractions();
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

// get all rows from types, locations, and formats tables
async function optionsGet(req, res, next) {
  try {
    const options = [
      queries.selectAllFromTable("types"),
      queries.selectAllFromTable("locations"),
      queries.selectAllFromTable("formats"),
    ];

    [types, locations, formats] = await Promise.all(options);

    const data = {
      message: "ok",
      types,
      locations,
      formats,
    };

    return res.json(data);
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

    const rows = await queries.selectInteractionsInRange(start, end, location);
    const count_days = await queries.countByDay(start, end, location);
    const count_type = await queries.countInteractionsInRange(
      start,
      end,
      location,
      "type",
    );
    const count_format = await queries.countInteractionsInRange(
      start,
      end,
      location,
      "format",
    );

    const count_total = await queries.countAllInteractionsInRange(
      start,
      end,
      location,
    );

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

module.exports = {
  interactionsGet,
  optionsGet,
  recordPost,
  reportGet,
  summaryGet,
};
