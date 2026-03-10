class ApiError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
