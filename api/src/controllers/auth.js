const jwt = require("jsonwebtoken");

// TODO : Add secret key and admin password to .env for production
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

function tokenPost(req, res, next) {
  // Access user submitted admin password
  const password = req.body.password;

  // Verify that user submitted admin password and actual admin password match
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: "user not authorized" });
  }

  res.json({ message: "user authorized" });
}

module.exports = { tokenPost };
