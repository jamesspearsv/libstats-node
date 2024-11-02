const { Router } = require("express");
const controller = require("../controllers/main");

const router = Router();

// ** ROUTES ** //
router.get("/", (req, res) => {
  res.status(403).send("<h1>403 Forbidden</h1>");
});
router.get("/interactions", controller.interactionsGet);
router.get("/options", controller.optionsGet);
router.post("/add", controller.addPost);
router.get("/report", controller.reportGet);
router.get("/dashboard", controller.dashboardGet);

module.exports = router;
