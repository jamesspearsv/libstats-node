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

module.exports = {
  selectAllGet,
  interactionsGet,
  optionsGet,
};
