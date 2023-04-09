import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").exists().withMessage("Please provide email"),
    body("email").isEmail().withMessage("Proper email should be provided"),
  ],
  (req: Request, res: Response) => {
    const body = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json(result.array());
    }
  }
);

export { router as signinRouter };
