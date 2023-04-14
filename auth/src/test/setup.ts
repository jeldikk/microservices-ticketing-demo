import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";

declare global {
  var mockSignin: () => Promise<string[]>;
  var mockSignup: () => Promise<request.Response>;
}

let mongoServer: MongoMemoryServer | null = null;

// hook that gets called before running a test suite
beforeAll(async () => {
  process.env.JWT_SECRET = "some-secret-key";
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

//hook that get called before calling any testcase
// clear all data in collections after test case.
beforeEach(async () => {
  //before running each test we delete all data in collections
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    collection.deleteMany({});
  }
});

//hook that gets called after completing test in a suite
//we are closing all connections after completing testcases
afterAll(async () => {
  // we will stop mongo memory server when completing all tests in a file
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.connection.close();
});

global.mockSignin = async () => {
  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "password",
  });
  const cookies = response.get("Set-Cookie");
  return cookies;
};

global.mockSignup = async () => {
  const response = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });
  expect(response.statusCode).toBe(201);

  return response;
};
