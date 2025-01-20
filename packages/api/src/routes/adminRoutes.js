const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const router = Router();

// Use token verification for all admin routes
router.use(verifyToken);

// Parse table name from url and assign req.table property
router.use((req, res, next) => {
  req.table = req.url.split("/")[1];
  next();
});

// Admin routes
router.get("/types/:id", adminController.rowGetById);
router.post("/types/:id", adminController.updateRowById);
router.post("/types", adminController.addNewRow);
router.get("/types", adminController.tableGet);

router.get("/locations/:id", adminController.rowGetById);
router.post("/locations/:id", adminController.updateRowById);
router.post("/locations", adminController.addNewRow);
router.get("/locations", adminController.tableGet);

router.get("/formats/:id", adminController.rowGetById);
router.get("/formats/:id", adminController.updateRowById);
router.post("/formats", adminController.addNewRow);
router.get("/formats", adminController.tableGet);

// todo: rename to a more semantic route and controller name. (i.e /admin/summary/count?)
router.get("/stats", adminController.statsGet);
// todo: rename to a more semantic route and controller name. (i.e /admin/summary/interactions?)
router.get("/interactions", adminController.interactionsGet);
router.get("/count/:table", adminController.countTable);

router.get("/report", adminController.adminReportGet);

module.exports = router;
