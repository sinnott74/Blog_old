import { Request, Response, NextFunction } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    // returns true if protocol = https
    next();
  } else {
    res.redirect("https://" + req.headers.host + req.url);
  }
}
