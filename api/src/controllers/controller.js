const queries = require('../db/queries');

async function typesGet(res, res) {
  const data = await queries.selectTypes();
  res.json(data);
}

async function locationsGet(req, res) {
  const data = await queries.selectLocations();
  res.json(data);
}

async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

module.exports = {
  typesGet,
  locationsGet,
  interactionsGet,
};
