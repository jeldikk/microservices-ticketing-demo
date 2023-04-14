import request from "supertest";
import app from "../../app";

const signinUrlPath = "/api/users/signin";
const signupUrlPath = "/api/users/signup";

describe("SignIn Test Suite", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "some-jwt-secret";
  });
  it("should return 400 if email is invalid", async () => {
    const response = await request(app).post(signinUrlPath).send({
      email: "invalid-email",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if email is empty", async () => {
    const response = await request(app).post(signinUrlPath).send({
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 when user tries to signin with invalid account", async () => {
    const response = await request(app).post(signinUrlPath).send({
      email: "test@test.com",
      password: "password",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if entered password is wrong for an existing user", async () => {
    await mockSignin();

    const response = await request(app).post(signinUrlPath).send({
      email: "test@test.com",
      password: "wrong-password",
    });
    expect(response.statusCode).toBe(400);
  });

  it("should set a cookie in response for valid email and password", async () => {
    //let create a user with email and password for next iteration testing
    await mockSignup();

    //Now lets send request to si
    const response = await request(app).post(signinUrlPath).send({
      email: "test@test.com",
      password: "password",
    });

    // console.log({ body: response.body });
    expect(response.get("Set-Cookie")).toBeDefined();
    expect(response.body.email).toBe("test@test.com");
  });
});
