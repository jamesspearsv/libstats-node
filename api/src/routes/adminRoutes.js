const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const appController = require("../controllers/appController");

const router = Router();

// Use token verification for all admin routes
router.use(verifyToken);
// Parse table name from url and assign req.table
router.use((req, res, next) => {
  req.table = req.url.split("/")[1];
  next();
});

// Admin routes
router.get("/types/:id", adminController.rowGetById);
router.get("/types", adminController.tableGet);
router.get("/locations/:id", adminController.rowGetById);
router.get("/locations", adminController.tableGet);
router.get("/formats/:id", adminController.rowGetById);
router.get("/formats", adminController.tableGet);

module.exports = router;
