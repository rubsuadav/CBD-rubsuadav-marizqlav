import { Project } from "../models/project.js";
import { getStatusProject } from "../utils/utils.js";
import {
  handleValidateUniqueProject,
  handleValidationErrors,
} from "../validators/validate.js";

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await Project.find({}, { __v: 0 });
    if (projects.length === 0)
      return res.status(404).json({ message: "No projects found" });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingProjects = async (_req, res) => {
  const projects = await getStatusProject("Pendiente");
  if (projects.message) return res.status(404).json(projects);
  res.status(200).json(projects);
};

export const getInProgressProjects = async (_req, res) => {
  const projects = await getStatusProject("En progreso");
  if (projects.message) return res.status(404).json(projects);
  res.status(200).json(projects);
};

export const getCompletedProjects = async (_req, res) => {
  const projects = await getStatusProject("Completado");
  if (projects.message) return res.status(404).json(projects);
  res.status(200).json(projects);
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  if (await handleValidateUniqueProject(req.body.name, res)) return;
  try {
    const project = new Project(req.body);
    //TODO: ASOCIATE PROJECT STATUS ACCORDING TO TASK STATUS
    /*
        // for task on tasks array, if any task.status is "Pendiente" then project status is "Pendiente"
        // if all task.status is "Completada" then project status is "Completado"
        // if any task.status is "En progreso" then project status is "En progreso"
         */
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    handleValidationErrors(error, res);
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
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

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
