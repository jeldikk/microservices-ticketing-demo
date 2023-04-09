import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation.error";
import DatabaseConnectionError from "../errors/database-connection.error";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request.error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").exists().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").exists().withMessage("Password field is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters length"),
  ],
  async (req: Request, res: Response) => {
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()) {
      throw new RequestValidationError(validErrors.array());
    } else {
      // console.log({ env: process.env });
      const { email, password } = req.body;
      const existingUser = await User.findOne(
        { email },
        {
          passwordSalt: 0,
          passwordHash: 0,
        }
      );
      console.log({ existingUser });
      if (existingUser) {
        throw new BadRequestError("User Already exists");
      }
      const user = User.build({
        email,
        password,
      });
      await user.save();
      //Generate Json Web Token
      // console.log(process.env);
      // if (!process.env.JWT_SECRET) {
      //   throw new Error("No JWT_SECRET found in environment");
      // }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET!
      );
      // Store it on sessin object
      req.session = {
        token,
      };
      res.status(201).json(user);
    }
  }
);

export { router as signupRouter };
