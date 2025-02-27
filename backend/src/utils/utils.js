import { Project } from "../models/project.js";
import { Task } from "../models/task.js";

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
