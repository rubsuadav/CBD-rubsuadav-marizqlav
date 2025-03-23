import { Project } from "../models/project.js";
import { Task } from "../models/task.js";
import { updateProjectStatus } from "../utils/utils.js";
import {
  handleValidateUniqueProject,
  handleValidationErrors,
} from "../validators/validate.js";

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await Project.find({}, { __v: 0 }).populate("tasks");
    if (projects.length === 0)
      return res.status(404).json({ message: "No projects found" });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");
    if (!project) return res.status(404).json({ message: "Project not found" });
    await updateProjectStatus(project);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  if (await handleValidateUniqueProject(req.body.name, res)) return;
  try {
    const project = new Project(req.body);
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
    project.tasks.forEach(async (task) => {
      await Task.findByIdAndDelete(task._id);
    });
    res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const asociateTaskToProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (Array.isArray(req.body.taskId)) {
      const tasks = await Task.find({ _id: { $in: req.body.taskId } });
      if (tasks.length === 0)
        return res.status(404).json({ message: "Task not found" });

      for (const t of tasks) {
        if (project.tasks.some((p) => p._id.toString() === t._id.toString())) {
          return res.status(400).json({ message: "Task already associated" });
        }
      }

      project.tasks.push(...tasks);
      await updateProjectStatus(project);
      await project.save();
      return res.status(201).json(project);
    } else {
      return res
        .status(400)
        .json({ message: "You must provide an array of task ids" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
