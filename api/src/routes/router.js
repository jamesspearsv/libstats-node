const { Router } = require('express');
const db = require('../db/connection');
const controller = require('../controllers/controller');

const router = Router();

router.get('/types', controller.selectAllGet);
router.get('/locations', controller.selectAllGet);
router.get('/interactions', controller.interactionsGet);

module.exports = router;
