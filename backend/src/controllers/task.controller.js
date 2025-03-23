import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import {
  handleValidateUniqueTask,
  handleValidationErrors,
} from "../validators/validate.js";

export const createTask = async (req, res) => {
  if (await handleValidateUniqueTask(req.body.title, res)) return;
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    handleValidationErrors(error, res);
  }
};

export const getAllTasks = async (_req, res) => {
  try {
    const tasks = await Task.find({}, { __v: 0 });
    if (tasks.length === 0)
      return res.status(404).json({ message: "No tasks found" });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(200).json(task);
  } catch (error) {
    switch (error.name) {
      case "MongooseError":
        return res.status(400).json({ message: error.message });
      case "CastError":
        return res.status(404).json({ message: error.message });
      default:
        return;
    }
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task no encontrado" });
    }
    await User.updateMany({ tasks: task._id }, { $pull: { tasks: task._id } });

    res.status(200).json({ message: "Task eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchTasksByPriority = async (req, res) => {
  const priority = req.query.priority;
  if (!priority)
    return res.status(400).json({ message: "priority is required" });
  try {
    const tasks = await Task.find({ priority: { $eq: priority } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    if (!["Pendiente", "En Progreso", "Completada"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
