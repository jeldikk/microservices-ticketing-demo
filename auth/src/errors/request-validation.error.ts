import { ValidationError } from "express-validator";
import { CustomError, ICustomError } from "./custom-error";

class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("[RequestValidationError]");

    // since we are trying to extends from a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeTo() {
    const formattedErrors = this.errors.map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });
    // console.log({ formattedErrors });
    return {
      errors: formattedErrors,
    };
  }
}

export default RequestValidationError;
