const { Router } = require('express');
const db = require('../db/connection');
const controller = require('../controllers/controller');

const router = Router();

router.get('/types', controller.typesGet);
router.get('/locations', controller.locationsGet);
router.get('/interactions', controller.interactionsGet);

module.exports = router;
