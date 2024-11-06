// Errors involving querying and updating database
class DatabaseError extends Error {
  constructor(details) {
    super();
    this.message = "Database error";
    this.statusCode = 500;
    this.name = "DatabaseError";
    this.details = details;
  }
}

// Errors involving malformed or incomplete requests
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}

// Errors involving unauthorized or expired access tokens
class UnauthorizedRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnauthorizedRequestError";
  }
}

module.exports = {
  DatabaseError,
  BadRequestError,
  UnauthorizedRequestError,
};
