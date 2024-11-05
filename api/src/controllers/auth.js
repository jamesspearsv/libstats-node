const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  UnauthorizedRequestError,
  BadRequestError,
} = require("../lib/errorsClasses");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const SECRET_KEY = process.env.SECRET_KEY || "secretkey";

function issueToken(req, res, next) {
  try {
    // Access user submitted admin password
    const password = req.body.password;

    // Verify that user submitted admin password and actual admin password match
    if (password !== ADMIN_PASSWORD) {
      // return res.status(401).json({ message: "Invalid password" });
      return next(new UnauthorizedRequestError("Invalid password"));
    }

    // issue access token that expires in a set duration of time
    const payload = crypto.randomBytes(16).toString("hex");
    const token = jwt.sign({ payload }, SECRET_KEY, {
      expiresIn: "10m",
    });

    return res.json({ message: "User authorized", token });
  } catch (error) {
    return next(error);
  }
}

function verifyToken(req, res, next) {
  // Verify that correct header is present
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new BadRequestError("Bad request"));
  }

  // Verify that a token is provided
  const token = authorization.split(" ")[1];
  if (!token) return next(new BadRequestError("No token provided"));

  // Verify that provided token is valid
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return next(new UnauthorizedRequestError(err.message));

    return next();
  });
}

function verifyGet(req, res) {
  res.json({ message: "Token verified" });
}

module.exports = { issueToken, verifyToken, verifyGet };
