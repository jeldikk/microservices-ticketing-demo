import request from "supertest";
import app from "../../app";

const signupUrlPath = "/api/users/signup";
const currentUserUrlPath = "/api/users/currentUser";

describe("Current User Test Suite", () => {
  it("should respond details of the current user", async () => {
    const signupResponse = await mockSignup();

    const response = await request(app)
      .get(currentUserUrlPath)
      .set("Cookie", signupResponse.get("Set-Cookie"))
      .send();

    // console.log({ body: response.body });
    // console.log(response.body.email);
    expect(response.body.currentUser.email).toBe("test@test.com");
  });
});
