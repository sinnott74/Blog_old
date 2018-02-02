const ApplicationException = require('./ApplicationException');

class MultipleRecordsFoundException extends ApplicationException {

  constructor(message) {
    super(message);
    this.status = 500;
  }
}

module.exports = MultipleRecordsFoundException;