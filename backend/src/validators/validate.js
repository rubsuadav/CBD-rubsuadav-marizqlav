import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export function handleValidationErrors(error, res) {
  const keyError = error.message.split(":");
  return res.status(400).json({
    atributeError: keyError[1].trim(),
    message: keyError[2].trim().split(",")[0],
  });
}

export async function handleValidateUniqueProject(name, res) {
  if (await Project.findOne({ name: name })) {
    return res.status(400).json({
      message:
        "Project name already exists, please create another with other name",
    });
  }
}

export async function handleValidateUniqueTask(title, res) {
  if (await Task.findOne({ title: title })) {
    return res.status(400).json({
      message:
        "Task title already exists, please create another with other title",
    });
  }
}

export async function handleValidateUniqueUser(username, email, res) {
  if (await User.findOne({ $or: [{ username }, { email }] })) {
    return res.status(400).json({
      message: "Username or email already exists, please choose another",
    });
  }
}

export function validateEmail(email, res) {
  if (!/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(email)) {
    return res
      .status(400)
      .json({ message: "Email must be from gmail, hotmail or outlook" });
  }
}
