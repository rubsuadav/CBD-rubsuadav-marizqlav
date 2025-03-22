import { Router } from "express";

// local imports
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasksByPriority,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { authenticatedGuard } from "../middlewares/authenticatedGuard.js";

const router = Router();

router.post("/task", authenticatedGuard, createTask);
router.get("/tasks/priority", searchTasksByPriority);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", authenticatedGuard, updateTask);
router.delete("/task/:id", authenticatedGuard, deleteTask);
router.put("/tasks/:taskId/status", updateTaskStatus);

export default router;
