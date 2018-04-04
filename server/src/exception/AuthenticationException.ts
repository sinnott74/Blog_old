import ApplicationException from "./ApplicationException";

class AuthenticationException extends ApplicationException {
  constructor() {
    super("Authentication Failed");
    this.status = 401;
  }
}

export default AuthenticationException;
