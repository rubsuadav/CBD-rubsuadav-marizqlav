import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
    minlength: [5, "El título debe tener al menos 5 caracteres"],
    maxlength: [100, "El título no puede tener más de 100 caracteres"],
    unique: [true, "El título debe ser único"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [10, "La descripción debe tener al menos 10 caracteres"],
    maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
  },
  status: {
    type: String,
    enum: ["Pendiente", "En Progreso", "Completada"],
    default: "Pendiente",
  },
  priority: {
    type: String,
    enum: ["Baja", "Media", "Alta", "Crítica"],
    default: "Baja",
  },
  createdAt: {
    type: Date,
    default: new Date().toUTCString().split(" ").slice(0, 5).join(" "),
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

export const Task = mongoose.model("Task", taskSchema, "tasks");
