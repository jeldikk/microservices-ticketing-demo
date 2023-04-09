import crypto from "crypto";
import util from "util";

const asyncPbkdf2 = util.promisify(crypto.pbkdf2);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await asyncPbkdf2(password, salt, 1000, 64, "sha512");
    return `${hash.toString("hex")}.${salt}`;
  }

  /*
  storedPassword: string - stored password from database; would be a hash
  suppliedPassword: string - supplied password to compare function; normal ascii string
  */
  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hashBuff = await asyncPbkdf2(
      suppliedPassword,
      salt,
      1000,
      64,
      "sha512"
    );
    return hashedPassword === hashBuff.toString("hex");
  }

  print() {}
}
