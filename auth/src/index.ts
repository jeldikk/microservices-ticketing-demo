import express from "express";
import morgan from "morgan";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found.error";

const PORT = 4000;

const app = express();
// makes the traffic to be proxied
app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false, // disable encryption on the cookie because we are already encrypting our jwt
    secure: true, // use only on secure http protocol
  })
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

app.use("*", async () => {
  throw new NotFoundError();
});

//errorHandler
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET variable present in environment");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/authdb");
    console.log("Connected to MongoDB Service");
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log("Listening auth server on port ", 4000);
  });
};

start();

// app.listen(PORT, () => {
//   console.log("Listening auth server on port ", 4000);
//   // sta
// });
