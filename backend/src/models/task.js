import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [5, "Title must be at least 5 characters long"],
    maxlength: [100, "Title cannot be more than 100 characters long"],
    unique: [true, "Title must be unique"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [500, "Description cannot be more than 500 characters long"],
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
});

export const Task = mongoose.model("Task", taskSchema, "tasks");
