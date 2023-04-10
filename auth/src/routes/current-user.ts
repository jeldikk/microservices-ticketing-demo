import express, { Request, Response } from "express";
import { validateCurrentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/reject-invalid-user";

type TokenPayload = {
  id: string;
  email: string;
};

const router = express.Router();

router.get(
  "/api/users/currentUser",
  validateCurrentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // console.log({ jwt: req.session?.token });
    //!req.session || !req.session.jwt => !req.session?.jwt
    const { currentUser } = req;
    res.status(200).json({ currentUser });
  }
);

export { router as currentUserRouter };
