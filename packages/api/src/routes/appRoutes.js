const { Router } = require("express");
const appController = require("../controllers/appController");

const router = Router();

router.get("/options", appController.optionsGet);
router.get("/report", appController.reportGet);
router.get("/summary", appController.summaryGet);
router.post("/record", appController.recordPost);

module.exports = router;
