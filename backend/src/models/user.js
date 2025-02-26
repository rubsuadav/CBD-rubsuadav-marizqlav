import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    maxlength: [30, "Nombre de usuario demasiado largo"],
    minlength: [3, "Nombre de usuario demasiado corto"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "Contraseña demasiado corta"],
  },
  createdAt: {
    type: Date,
    default: new Date().toUTCString().split(" ").slice(0, 5).join(" "),
  },
});

export const User = mongoose.model("User", userSchema, "users");
