class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "DatabaseError";
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "BadRequestError";
  }
}

class UnauthorizedRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = "UnauthorizedRequestError";
  }
}

module.exports = {
  DatabaseError,
  BadRequestError,
  UnauthorizedRequestError,
};
