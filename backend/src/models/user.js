import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    maxlength: [30, "Username is too long"],
    minlength: [3, "Username is too short"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password is too short"],
  },
  createdAt: {
    type: Date,
    default: new Date().toUTCString().split(" ").slice(0, 5).join(" "),
  },
});

export const User = mongoose.model("User", userSchema, "users");
