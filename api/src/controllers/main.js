const queries = require("../db/queries");

// TODO: Add custom error throws

// Select all interactions from db
async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  return res.json(data);
}

// get all options from types, locations, and formats tables
// used to populate form options in client
async function optionsGet(req, res, next) {
  try {
    const types = await queries.selectAllFromTable("types");
    const locations = await queries.selectAllFromTable("locations");
    const formats = await queries.selectAllFromTable("formats");

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
      if (results.includes(false)) throw new Error("Invalid options");

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
    if (!check) throw new Error(`Invalid location id: ${location}`); // if not throw error

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
