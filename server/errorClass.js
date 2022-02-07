class CustomError extends Error {
  constructor(message,status = 500,type="") {
    super();
    this.message = message;
    this.status = status;
    this.type = type;
  }
}

module.exports = {CustomError};