const queries = require('../db/queries');

// select all interactions from db
async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

// get all options from types, locations, and formats tables
// used to populate form options in client
async function optionsGet(req, res) {
  const types = await queries.selectAllFromTable('types');
  const locations = await queries.selectAllFromTable('locations');
  const formats = await queries.selectAllFromTable('formats');

  const data = {
    types,
    locations,
    formats,
  };

  res.json(data);
}

async function addPost(req, res) {
  const data = req.body;

  // Introduce timeout so client animation can play
  setTimeout(async () => {
    try {
      // Check that body contains only valid keys
      for (const key in data) {
        const check = await queries.checkIfExists(key + 's', data[key]);
        if (!check) throw 'invalid key';
      }
      // If valid body insert interaction into db
      await queries.insertInteraction(data);
      res.status(200).send('data received');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }, 1000);
}

module.exports = {
  interactionsGet,
  optionsGet,
  addPost,
};
