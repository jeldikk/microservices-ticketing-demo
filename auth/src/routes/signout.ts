import express, { Request, Response } from "express";

const router = express.Router();

//what is meant by signout process, it means to tell browser that dump all the session information
// delete/empty all tokens in cookie sessions
router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({});
});

export { router as signoutRouter };
