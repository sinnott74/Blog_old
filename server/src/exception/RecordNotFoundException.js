const ApplicationException = require('./ApplicationException');

class RecordNotFoundException extends ApplicationException {

  constructor(message) {
    super(message);
    this. status = 404;
  }
}

module.exports = RecordNotFoundException;