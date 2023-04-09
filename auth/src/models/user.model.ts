import mongoose from "mongoose";
import crypto from "crypto";
import util from "util";
import { Password } from "../services/password.service";

const asyncPbkdf2 = util.promisify(crypto.pbkdf2);
// an interface that describes the properties that define a new user
export interface UserAttributes {
  email: string;
  password: string;
}

interface UserDocument extends mongoose.Document<any> {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserAttributes> {
  build(attrs: UserAttributes): UserDocument;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // toObject: {
    //   transform(doc, ret) {
    //     console.log("transform from toObject");
    //     console.log({ doc, ret });
    //   },
    // },
    //There is also another method toObject
    toJSON: {
      // Please refer to the declarations and input types of transform function
      //
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

userSchema.methods.hashPassword = async function (password: string) {
  this.passwordSalt = crypto.randomBytes(16).toString("hex");

  const hashingOutput = await asyncPbkdf2(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  );

  console.log({ hashingOutput });
  this.passwordHash = hashingOutput;
};

userSchema.methods.validatePassword = async function (password: string) {
  const hashingOutput = await asyncPbkdf2(
    password,
    this.passwordSalt,
    1000,
    64,
    "sha512"
  );
  return hashingOutput === this.passwordHash;
};

// this save middleware will create password salt, hash and save the instance
userSchema.pre("save", async function (done) {
  //isModified will return true even when we are trying to create document on first time
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// userSchema.pre("save", function () {
//   console.log("calling second before saving the document");
// });

userSchema.post("save", function (...args) {
  console.log({ args });
  console.log("called after saving the document");
});

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

//we can implement similar factory function using static method also
// export const buildUser = (attrs: UserAttributes) => {
//   return new User(attrs);
// };

// User.build({
//   email: "email",
//   password: "password",
// });

// const user = User.build({
//   email: "jeldi@kamal.com",
//   password: "my-new-password",
// });

// export { userModel as User };
