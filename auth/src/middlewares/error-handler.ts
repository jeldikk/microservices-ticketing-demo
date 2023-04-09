import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("calling the error handler");
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.serializeTo());
  }
  res.status(400).json({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
  console.log("not an instance of CustomError");
};
