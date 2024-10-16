const queries = require('../db/queries');

// ** TODO -- ADD ERROR HANDLING CONTROLLER ** //

// Select all interactions from db
// CURRENTLY NOT USED FOR ANYTHING. JUST DEBUGGING
async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

// get all options from types, locations, and formats tables
// used to populate form options in client
async function optionsGet(req, res) {
  try {
    const types = await queries.selectAllFromTable('types');
    const locations = await queries.selectAllFromTable('locations');
    const formats = await queries.selectAllFromTable('formats');

    const data = {
      message: 'ok',
      types,
      locations,
      formats,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function addPost(req, res) {
  const data = req.body;

  // Introduce timeout so client animation can play
  setTimeout(async () => {
    try {
      // Check that body contains only valid keys
      for (const key in data) {
        const check = await queries.checkIfExists(key + 's', data[key]);
        // If not throw error
        if (!check) throw 'Invalid option id';
      }

      // If valid body insert interaction into db
      const result = await queries.insertInteraction(data);

      // Verify that interaction was inserted successfully
      if (!result) throw 'Error adding interaction';

      res.json({ message: 'data added' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, 1000);
}

async function reportGet(req, res) {
  // get interactions from db between date range
  try {
    // parse incoming query
    const { start, end, location } = req.query;

    // check that location is valid
    const check = await queries.checkIfExists('locations', location);
    if (!check) throw 'Invalid location id'; // if not throw error

    const rows = await queries.selectInteractionsInRange(start, end, location);
    const count_days = await queries.countByDay(start, end, location);
    const count_type = await queries.countInteractionsInRange(
      start,
      end,
      location,
      'type'
    );
    const count_format = await queries.countInteractionsInRange(
      start,
      end,
      location,
      'format'
    );

    const count_total = await queries.countAllInteractionsInRange(
      start,
      end,
      location
    );

    // throw error is unable to complete any queries
    if (!rows || !count_days || !count_format || !count_type || !count_total)
      throw 'Error building report';

    res.json({
      message: 'ok',
      rows,
      count_total,
      count_format,
      count_type,
      count_days,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

async function dashboardGet(req, res) {
  try {
    const count_month = await queries.countInteractionsThisMonth();

    if (!count_month) throw 'Error searching database';

    res.json({ message: 'ok', count_month });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  interactionsGet,
  optionsGet,
  addPost,
  reportGet,
  dashboardGet,
};
