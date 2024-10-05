const { Router } = require('express');
const db = require('../db/connection');
const controller = require('../controllers/controller');

const router = Router();

// ** ROUTES ** //
router.get('/interactions', controller.interactionsGet);
router.get('/options', controller.optionsGet);
router.post('/add', controller.addPost);

module.exports = router;
