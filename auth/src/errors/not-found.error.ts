import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("[NotFoundError]");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeTo(): { errors: { message: string; field: string }[] } {
    return {
      errors: [
        {
          message: "Page Not Found",
          field: "Not Found",
        },
      ],
    };
  }
}
