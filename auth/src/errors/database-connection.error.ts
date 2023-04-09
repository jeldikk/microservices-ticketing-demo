import { ICustomError, CustomError } from "./custom-error";

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason: string = "Error Connecting to database";
  constructor() {
    super("[DatabaseConnectionError]");
    // this.reason = reason;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeTo() {
    return {
      errors: [
        {
          message: this.reason,
          field: "Database Connection",
        },
      ],
    };
  }
}

export default DatabaseConnectionError;
