import { Task } from "../models/task.js";
import { handleValidationErrors } from "../validators/validate.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, users } = req.body;
    const newTask = new Task({ title, description, status, priority, users });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    handleValidationErrors(error, res);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("users");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("users");
    if (!task) {
      return res.status(404).json({ message: "Task no encontrado" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, users } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, users },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task no encontrado" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
