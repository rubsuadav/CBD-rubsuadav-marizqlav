import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getCompletedProjects,
  getInProgressProjects,
  getPendingProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/projects", getAllProjects);
router.get("/projects/pending", getPendingProjects);
router.get("/projects/in-progress", getInProgressProjects);
router.get("/projects/completed", getCompletedProjects);
router.post("/project", createProject);
router.get("/project/:id", getProjectById);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
