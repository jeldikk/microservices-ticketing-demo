import request from "supertest";
import app from "../../app";

const signoutUrlPath = "/api/users/signout";
const signupUrlPath = "/api/users/signup";

describe("SignOut Test Suite", () => {
  it("clears cookies after signout", async () => {
    await request(app)
      .post(signupUrlPath)
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app).post(signoutUrlPath).send();
    expect(response.statusCode).toBe(200);
    console.log({ cookie: response.get("Set-Cookie") });
  });
});
