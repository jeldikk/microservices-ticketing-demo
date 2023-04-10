import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request.error";

type TokenPayload = {
  email: string;
  id: string;
};

declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenPayload | null;
    }
  }
}

/*
 * middleware which would extract user details from token
 * and 

*/

export const validateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.token) {
    // throw new BadRequestError("Invalid User or User must be loggedIn");
    req.currentUser = null;
  }

  try {
    const tokenPayload = (await jwt.verify(
      req.session?.token,
      process.env.JWT_SECRET!
    )) as TokenPayload;
    req.currentUser = {
      email: tokenPayload.email,
      id: tokenPayload.id,
    };
  } catch (err) {
    // next(new BadRequestError("System Error Occurred"));
  }
  next();
};
