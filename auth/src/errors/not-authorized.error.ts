import { CustomError } from "./custom-error";

class NotAuthorizedError extends CustomError {
  statusCode = 401;
  message: string;
  constructor(message: string) {
    super("NotAuthorizedError");
    this.message = message;
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  serializeTo(): { errors: { message: string; field: string }[] } {
    return {
      errors: [
        {
          message: this.message,
          field: "NotAuthorized",
        },
      ],
    };
  }
}

export default NotAuthorizedError;
