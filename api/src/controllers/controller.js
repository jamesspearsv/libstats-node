const queries = require("../db/queries");

// TODO : replace `throw` calls with `throw new Error()` calls
// TODO : improve error handling and readability

// Select all interactions from db
// CURRENTLY NOT USED FOR ANYTHING. JUST DEBUGGING
async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
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

    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function addPost(req, res, next) {
  const { type, location, format } = req.body;

  // Introduce timeout so client animation can play
  setTimeout(async () => {
    try {
      // Check that body contains only valid keys
      // TODO : Refactor to use Promise.All rather than awaiting one at a time
      for (const key in req.body) {
        const check = await queries.checkIfExists(key + "s", req.body[key]);
        // If not throw error
        if (!check) throw "Invalid option id";
      }

      console.log(req.body);

      // If valid body insert interaction into db
      const result = await queries.insertInteraction(type, location, format);

      // Verify that interaction was inserted successfully
      if (!result) throw "Error adding interaction";

      res.json({ message: "data added" });
    } catch (error) {
      next(error);
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
    if (!check) throw "Invalid location id"; // if not throw error

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

    res.json({
      message: "ok",
      rows,
      count_total,
      count_format,
      count_type,
      count_days,
    });
  } catch (error) {
    next(error);
  }
}

async function dashboardGet(req, res, next) {
  try {
    const count_month = await queries.countInteractionsThisMonth();

    res.json({ message: "ok", count_month });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  interactionsGet,
  optionsGet,
  addPost,
  reportGet,
  dashboardGet,
};
