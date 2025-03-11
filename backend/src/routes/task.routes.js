import { Router } from "express";

// local imports
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getPendingTasks,
  getInProgressTasks,
  getCompletedTasks,
  getLowPriorityTasks,
  getMediumPriorityTasks,
  getHighPriorityTasks,
  getCriticalPriorityTasks,
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
router.get("/tasks/pending", getPendingTasks);
router.get("/tasks/in-progress", getInProgressTasks);
router.get("/tasks/completed", getCompletedTasks);
router.get("/tasks/priority/low", getLowPriorityTasks);
router.get("/tasks/priority/medium", getMediumPriorityTasks);
router.get("/tasks/priority/high", getHighPriorityTasks);
router.get("/tasks/priority/critical", getCriticalPriorityTasks);
router.put('/tasks/:taskId/status', updateTaskStatus);

export default router;
