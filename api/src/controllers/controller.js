const queries = require('../db/queries');

// select all interactions from db
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
    const query = req.query;
    const start = `${query.start}T00:00:00.000Z`;
    const end = `${query.end}T23:59:59.999Z`;
    const location = query.location;

    // check that location is valid
    const check = await queries.checkIfExists('locations', location);
    if (!check) throw 'Invalid location id'; // if not throw error

    const rows = await queries.selectInteractionsInRange(start, end, location);

    res.json({ message: 'ok', rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

module.exports = {
  interactionsGet,
  optionsGet,
  addPost,
  reportGet,
};
