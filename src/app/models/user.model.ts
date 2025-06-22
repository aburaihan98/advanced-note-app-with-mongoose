import { Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import {
  IAddress,
  IUser,
  userInstanceMethod,
  userStaticMethod,
} from "../interfaces/user.interface";
import validator from "validator";

const addressSchema = new Schema<IAddress>(
  {
    city: String,
    zip: Number,
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, userStaticMethod, userInstanceMethod>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Must be at least 3, got {VALUE}"],
    maxlength: 15,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "This email has been sent"],
    lowercase: true,
    required: true,
    trim: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: (props) => {
    //     return `Email ${props.value} is not valid email`;
    //   },
    // },
    validate: [validator.isEmail, "Email is not valid email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: {
      values: ["USER", "ADMIN"],
      message: "No validate role",
    },
    default: "USER",
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

userSchema.method(
  "hashPassword",
  async function userInstanceMethod(plainPassword: string) {
    const bcryptPassword = await bcrypt.hash(plainPassword, 10);
    this.password = bcryptPassword;
    return this.save();
  }
);

userSchema.static(
  "hashPassword",
  async function userStaticMethod(plainPassword: string) {
    const bcryptPassword = await bcrypt.hash(plainPassword, 10);
    return bcryptPassword;
  }
);

export const User = model<IUser, userStaticMethod>("User", userSchema);
