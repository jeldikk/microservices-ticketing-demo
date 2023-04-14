import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation.error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request.error";
import { Password } from "../services/password.service";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").notEmpty().withMessage("Please provide email"),
    body("email").isEmail().withMessage("Proper email should be provided"),
    body("password")
      .notEmpty()
      .withMessage("Password field is missing, add one"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // console.log({ existingUser });
    if (!existingUser) {
      // Never provide description of errors, try to keep error message less descriptive as much possible
      throw new BadRequestError("Login request failed");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials");
    }
    // console.log("Generating Token for signin workflow");
    // what should happen when password is a match
    //Generate a JWT
    const token = jwt.sign(
      { id: existingUser.id, email },
      process.env.JWT_SECRET!
    );
    req.session = {
      token,
    };

    res.status(200).json(existingUser);
  }
);

export { router as signinRouter };
