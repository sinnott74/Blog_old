import { Request, Response, NextFunction } from "express";
import ApplicationException from "../exception/ApplicationException";

export default function(
  err: ApplicationException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const status = err.status || 500;
  res.status(status).send(err.message);
}
