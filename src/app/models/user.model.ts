import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

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
    unique: true,
    loadClass: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

export const User = model("User", userSchema);
