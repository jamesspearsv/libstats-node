const { Router } = require("express");
const appController = require("../controllers/main");

const router = Router();

// ** ROUTES ** //
router.get("/", (req, res) => {
  res.status(403).send("<h1>403 Forbidden</h1>");
});
router.get("/interactions", appController.interactionsGet);
router.get("/options", appController.optionsGet);
router.post("/record", appController.recordPost);
router.get("/report", appController.reportGet);
router.get("/summary", appController.summaryGet);

module.exports = router;
