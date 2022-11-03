class CustomError {
  constructor(msg, statusCode) {
      this.msg = msg;
      this.statusCode = statusCode;
  }
}

module.exports = CustomError;
