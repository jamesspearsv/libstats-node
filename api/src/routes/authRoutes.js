const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/token", authController.issueToken);
router.get("/verify", authController.verifyToken, authController.verifyGet);

module.exports = router;
