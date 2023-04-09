import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/:currentUser", (req: Request, res: Response) => {
  console.log({ params: req.params });
  res.status(200).json({
    status: "success",
    user: {},
  });
});

export { router as currentUserRouter };
