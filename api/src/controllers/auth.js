const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password";
const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

function issueToken(req, res, next) {
  try {
    // Access user submitted admin password
    const password = req.body.password;

    // Verify that user submitted admin password and actual admin password match
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "user not authorized" });
    }

    const token = jwt.sign(crypto.randomBytes(10).toString("hex"), SECRET_KEY);

    return res.json({ message: "user authorized", token });
  } catch (error) {
    return next(error);
  }
}

function verifyToken(req, res, next) {
  // Verify that correct header is present
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new Error("No authorization header"));
  }

  // Verify that a token is provided
  const token = authorization.split(" ")[1];
  if (token === null) return next(new Error("No token provided"));

  // Verify that provided token is valid
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return next(err); // if token is invalid pass error to error handler

    res.authorized = true;
    res.token = token;
    next();
  });
}

function verifyGet(req, res, next) {
  res.json({ message: "user verified" });
}

module.exports = { issueToken, verifyToken, verifyGet };
