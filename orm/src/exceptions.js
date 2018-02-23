class ApplicationException extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class MultipleRecordsFoundException extends ApplicationException {

  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class RecordNotFoundException extends ApplicationException {

  constructor(message) {
    super(message);
    this. status = 404;
  }
}

module.exports = {
  MultipleRecordsFoundException: MultipleRecordsFoundException,
  RecordNotFoundException: RecordNotFoundException
}

