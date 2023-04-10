import mongoose from "mongoose";
import app from "./app";

const PORT = 4000;

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
