import request from "supertest";
import app from "../../app";

const signupUrlPath = "/api/users/signup";

describe("signup test suite", () => {
  it("should return a 201 on successful signup", async () => {
    const response = await request(app).post(signupUrlPath).send({
      email: "haha@hehe.com",
      password: "password",
    });
    // console.log({ body: response.body });
    expect(response.statusCode).toBe(201);
  });

  it("should return 400 with an invalid email in post payload", async () => {
    const response = await request(app).post(signupUrlPath).send({
      email: "some-invalid-email",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 with an invalid password string in post payload", async () => {
    const response = await request(app).post(signupUrlPath).send({
      email: "validEmail@email.com",
      password: "pa",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should return a 400 status code on wrong input payload", async () => {
    const response = await request(app).post(signupUrlPath).send({
      password: "password",
    });
    // console.log({ body: response.body });
    expect(response.statusCode).toBe(400);
  });

  it("should not allow duplicate emails", async () => {
    const response = await mockSignup();

    // expect(response.statusCode).toBe(201);
    const another = await request(app).post(signupUrlPath).send({
      email: "test@test.com",
      password: "password",
    });
    expect(another.statusCode).toBe(400);
  });

  it("should set a cookie after successful signup", async () => {
    // console.log({ environment: process.env });
    const response = await mockSignup();

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
