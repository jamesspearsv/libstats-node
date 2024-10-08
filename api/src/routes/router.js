const { Router } = require('express');
const db = require('../db/connection');
const controller = require('../controllers/controller');

const router = Router();

// ** ROUTES ** //
router.get('/interactions', controller.interactionsGet);
router.get('/options', controller.optionsGet);
router.post('/add', controller.addPost);
router.get('/report', controller.reportGet);
router.get('/count', controller.countGet);

module.exports = router;
