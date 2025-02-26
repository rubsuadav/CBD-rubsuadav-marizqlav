import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    createAt: {
        type: Date,
        default: new Date().toUTCString().split(" ").slice(0, 5).join(" "),
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be at most 50 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters"],
        maxlength: [50, "Last name must be at most 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [50, "Username must be at most 50 characters"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"],
        unique: [true, "Phone already exists"],
    },

});

export const User = mongoose.model("User", userSchema, "users");