const queries = require('../db/queries');

async function selectAllGet(req, res) {
  const data = await queries.selectAllFromTable(req.url.substring(1));
  res.json(data);
}

async function interactionsGet(req, res) {
  const data = await queries.selectInteractions();
  res.json(data);
}

module.exports = {
  selectAllGet,
  interactionsGet,
};
