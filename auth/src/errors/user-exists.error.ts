import { CustomError } from "./custom-error";

export class UserExistsError extends CustomError {
  statusCode: number = 403;

  constructor() {
    super("[UserAlreadyExists]");

    Object.setPrototypeOf(this, UserExistsError.prototype);
  }

  serializeTo(): { errors: { message: string; field: string }[] } {
    return {
      errors: [
        {
          message: "User with given email already Exists",
          field: "email",
        },
      ],
    };
  }
}
