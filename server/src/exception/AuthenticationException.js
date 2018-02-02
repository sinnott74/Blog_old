const ApplicationException = require('./ApplicationException');

class AuthenticationException extends ApplicationException {

  constructor(message) {
    super(message);
    this. status = 401;
  }
}

module.exports = AuthenticationException;