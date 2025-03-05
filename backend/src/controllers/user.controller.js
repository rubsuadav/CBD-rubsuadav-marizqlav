import { User } from "../models/user.js";
import { assignTasks } from "../utils/utils.js";

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

export const assignTasksToUser = async (req, res) => {
  try {
    const { userId, taskIds } = req.body;
    const result = await assignTasks(userId, taskIds);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeTasksFromUser = async (req, res) => {
  try {
    const { userId, taskIds } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.tasks = user.tasks.filter(taskId => !taskIds.includes(taskId.toString()));
    await user.save();
    res.status(200).json({ message: "Tasks removed successfully" });
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