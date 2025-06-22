import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from "validator";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Must be at least 6, got {VALUE}"],
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
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "This email has been sent"],
    loadClass: true,
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
});

export const User = model("User", userSchema);
