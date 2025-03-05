import { User } from "../models/user.js";
import { assignTask } from "../utils/utils.js";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, { __v: 0 })
      .populate("tasks")
      .populate("projects");
    if (users.length === 0)
      return res.status(404).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("tasks")
      .populate("projects");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignTaskToUser = async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const result = await assignTask(userId, taskId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("tasks");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};