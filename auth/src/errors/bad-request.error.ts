import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  public message: string;

  constructor(message: string) {
    super("[BadRequestError]");
    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeTo(): { errors: { message: string; field: string }[] } {
    return {
      errors: [
        {
          message: this.message,
          field: "some field",
        },
      ],
    };
  }
}
