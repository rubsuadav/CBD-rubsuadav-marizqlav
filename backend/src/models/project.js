import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Project name already exists"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pendiente", "En progreso", "Completado"],
    default: "Pendiente",
  },
  createdAt: {
    type: Date,
    default: new Date().toUTCString().split(" ").slice(0, 5).join(" "),
  },

  // 1 project has many users
  // users: [
  //     {
  //         type: Schema.Types.ObjectId,
  //         ref: "User",
  //     },
  // ],

  // 1 project has many tasks
  // tasks: [
  //     {
  //     type: Schema.Types.ObjectId,
  //     ref: Task,
  //     },
  // ],
});

export const Project = mongoose.model("Project", projectSchema, "projects");
