import { NextFunction, Request, Response } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
  // Log error to console:
  console.log(err);

  // log error to log file...

  // Get status code:
  if (err.code === "ER_DUP_ENTRY") {
    response.status(409).send("this email already exists");
  }
  const statusCode = err.status ? err.status : 500;

  // Return error to frontend:
  response.status(statusCode).send(err.message);
}

export default catchAll;
