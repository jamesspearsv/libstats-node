const { Router } = require("express");
const appController = require("../controllers/main");

const router = Router();

// ** ROUTES ** //
router.get("/interactions", appController.interactionsGet);
router.get("/options", appController.optionsGet);
router.post("/record", appController.recordPost);
router.get("/report", appController.reportGet);
router.get("/summary", appController.summaryGet);

module.exports = router;
