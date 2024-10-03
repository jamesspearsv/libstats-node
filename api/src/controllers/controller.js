const queries = require('../db/queries');

function typesGet(res, res) {}

function locationsGet(req, res) {}

async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

module.exports = {
  typesGet,
  locationsGet,
  interactionsGet,
};
