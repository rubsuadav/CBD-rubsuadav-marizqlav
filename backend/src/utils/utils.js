import { Project } from "../models/project.js";

export async function getStatusProject(status) {
  try {
    const projects = await Project.find({ status: status });
    if (projects.length === 0) return { message: "No projects found" };
    return projects;
  } catch (error) {
    return { message: error.message };
  }
}
