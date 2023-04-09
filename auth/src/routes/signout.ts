import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  const body = req.body;
});

export { router as signoutRouter };
