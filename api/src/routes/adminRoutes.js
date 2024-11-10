const { Router } = require("express");
const { verifyToken } = require("../controllers/authController");
const { interactionGet, optionsGet } = require("../controllers/appController");

const router = Router();

// Use token verification for all admin routes
router.use(verifyToken);

module.exports = router;
