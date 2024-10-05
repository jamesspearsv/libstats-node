const queries = require('../db/queries');

async function selectAllGet(req, res) {
  const data = await queries.selectAllFromTable(req.url.substring(1));
  res.json(data);
}

async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

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

  setTimeout(async () => {
    try {
      // Check that body contains all valid keys
      for (const key in data) {
        const check = await queries.checkIfExists(key + 's', data[key]);
        if (!check) throw 'invalid key';
      }
      // If valid body insert interaction
      await queries.insertInteraction(data);
      res.status(200).send('data received');
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }, 1000);
}

module.exports = {
  selectAllGet,
  interactionsGet,
  optionsGet,
  addPost,
};
