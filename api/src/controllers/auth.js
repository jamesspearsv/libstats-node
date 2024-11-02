const jwt = require("jsonwebtoken");

// TODO : Add secret key and admin password to .env for production
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

function tokenPost(req, res, next) {
  res.send("wip -- /auth/token");
}

module.exports = { tokenPost };
