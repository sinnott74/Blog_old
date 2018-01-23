class AuthenticationException extends Error {

  constructor(message) {
    super(message);
  }
}

module.exports = AuthenticationException;