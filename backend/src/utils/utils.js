import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export async function getStatusProject(status) {
  try {
    const projects = await Project.find({ status: status }).populate("tasks");
    if (projects.length === 0) return { message: "No projects found" };
    return projects;
  } catch (error) {
    return { message: error.message };
  }
}

export async function getStatusTask(status) {
  try {
    const tasks = await Task.find({ status: status });
    if (tasks.length === 0) return { message: "No tasks found" };
    return tasks;
  } catch (error) {
    return { message: error.message };
  }
}

export async function getPriorityTask(priority) {
  try {
    const tasks = await Task.find({ priority: priority });
    if (tasks.length === 0) return { message: "No tasks found" };
    return tasks;
  } catch (error) {
    return { message: error.message };
  }
}

export async function updateProjectStatus(project) {
  const tasks = project.tasks;
  if (tasks.length > 0) {
    const taskId = tasks.map((task) => task._id);
    const task = await Task.find({ _id: { $in: taskId } });
    const taskStatus = task.map((task) => task.status);
    if (taskStatus.every((status) => status === "Pendiente")) {
      project.status = "Pendiente";
    } else if (taskStatus.every((status) => status === "Completada")) {
      project.status = "Completado";
    } else if (taskStatus.includes("En Progreso")) {
      project.status = "En progreso";
    } else {
      project.status = "Pendiente";
    }
  }
}

export async function assignTask(userId, taskId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    if (user.tasks.includes(taskId)) {
      throw new Error("Task already assigned to the user");
    }
    user.tasks.push(task);
    await user.save();
    return { message: "Task assigned successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}