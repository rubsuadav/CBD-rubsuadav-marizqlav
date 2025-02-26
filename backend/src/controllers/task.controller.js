import { Task } from "../models/task.js";
import { handleValidationErrors } from "../validators/validate.js";
import { getStatusTask, getPriorityTask } from "../utils/utils.js";

export const createTask = async (req, res) => {
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

export const getPendingTasks = async (_req, res) => {
  const tasks = await getStatusTask("Pendiente");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getInProgressTasks = async (_req, res) => {
  const tasks = await getStatusTask("En Progreso");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getCompletedTasks = async (_req, res) => {
  const tasks = await getStatusTask("Completada");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getLowPriorityTasks = async (_req, res) => {
  const tasks = await getPriorityTask("Baja");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getMediumPriorityTasks = async (_req, res) => {
  const tasks = await getPriorityTask("Media");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getHighPriorityTasks = async (_req, res) => {
  const tasks = await getPriorityTask("Alta");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
};

export const getCriticalPriorityTasks = async (_req, res) => {
  const tasks = await getPriorityTask("Crítica");
  if (tasks.message) return res.status(404).json(tasks);
  res.status(200).json(tasks);
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
    res.status(200).json({ message: "Task eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
