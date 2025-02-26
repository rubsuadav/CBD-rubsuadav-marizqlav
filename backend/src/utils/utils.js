import { Project } from "../models/project.js";
import { Task } from "../models/task.js";

export async function getStatusProject(status) {
  try {
    const projects = await Project.find({ status: status });
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
