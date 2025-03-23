import { Router } from "express";

// local imports
import {
  asociateTaskToProject,
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller.js";
import { authenticatedGuard } from "../middlewares/authenticatedGuard.js";

const router = Router();

router.get("/projects", getAllProjects);
router.post("/project", authenticatedGuard, createProject);
router.get("/project/:id", getProjectById);
router.put("/project/:id", authenticatedGuard, updateProject);
router.delete("/project/:id", authenticatedGuard, deleteProject);
router.post("/project/:id/task", authenticatedGuard, asociateTaskToProject);

export default router;
