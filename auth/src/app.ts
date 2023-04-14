import express from "express";
import morgan from "morgan";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found.error";

const app = express();
// makes the traffic to be proxied
app.set("trust proxy", true);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "jeldikk-session",
    signed: false, // disable encryption on the cookie because we are already encrypting our jwt
    secure: process.env.NODE_ENV !== "test", // use only on secure http protocol
    maxAge: 50000,
  })
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

//middleware invoked when user tried to provide path out-of-the-box
app.use("*", async () => {
  throw new NotFoundError();
});

//errorHandler
app.use(errorHandler);

export default app;
