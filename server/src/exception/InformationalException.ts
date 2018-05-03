import ApplicationException from "./ApplicationException";

class InformationalException extends ApplicationException {
  constructor(message: string) {
    super(message, 400);
  }
}

export default InformationalException;
