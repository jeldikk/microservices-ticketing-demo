import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request.error";

type TokenPayload = {
  id: string;
  email: string;
};

const router = express.Router();

router.get("/api/users/currentUser", async (req: Request, res: Response) => {
  // console.log({ jwt: req.session?.token });
  //!req.session || !req.session.jwt => !req.session?.jwt
  if (!req.session?.token) {
    return res.status(200).json({
      currentUser: null,
    });
  }

  try {
    // jwt.verify will validate if the token sent on cookie is tampered or modified
    const tokenPayload = (await jwt.verify(
      req.session?.token,
      process.env.JWT_SECRET!
    )) as TokenPayload;

    // console.log({
    //   token: req.session?.token,
    //   payload: tokenPayload,
    // });

    res.status(200).json({
      status: "success",
      currentUser: {
        id: tokenPayload.id,
        email: tokenPayload.email,
      },
    });
  } catch (err) {
    res.status(200).json({
      currentUser: null,
    });
  }
});

export { router as currentUserRouter };
