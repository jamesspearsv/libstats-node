const { Router } = require("express");
const authController = require("../controllers/auth");

const router = Router();

router.post("/token", authController.tokenPost);

module.exports = router;
