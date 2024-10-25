const { Router } = require('express');
const controller = require('../controllers/controller');

const router = Router();

// ** ROUTES ** //
router.get('/', (req, res) => {
  res.status(403).send('<h1>403 Forbidden</h1>');
});
router.get('/interactions', controller.interactionsGet);
router.get('/options', controller.optionsGet);
router.post('/add', controller.addPost);
router.get('/report', controller.reportGet);
router.get('/dashboard', controller.dashboardGet);

// ** ERROR HANDLING ** //
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err });
});

module.exports = router;
