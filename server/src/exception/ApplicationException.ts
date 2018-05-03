class ApplicationException extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApplicationException;
