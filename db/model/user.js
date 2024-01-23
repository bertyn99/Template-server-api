import { Schema as _Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
const Schema = _Schema;
import validator from "validator";
import config from "../../config.js";

const { sign } = jwt;
const { isEmail } = validator;
const { JWT_SECRET } = config;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Invalid Email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain password.");
        }
        /* add number in password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            add one Maj a t least in the password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            
            */
      },
    },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    createIp: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    resetPassword: { type: Object, required: false },
    mobile: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = sign({ _id: user._id.toString() }, JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }

  next();
});

const User = model("User", userSchema);

export default User;
