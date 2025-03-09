import { Router } from "express";
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

const router = Router();

router.post("/task", createTask);
router.get("/tasks/priority", searchTasksByPriority);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.get("/tasks/pending", getPendingTasks);
router.get("/tasks/in-progress", getInProgressTasks);
router.get("/tasks/completed", getCompletedTasks);
router.get("/tasks/priority/low", getLowPriorityTasks);
router.get("/tasks/priority/medium", getMediumPriorityTasks);
router.get("/tasks/priority/high", getHighPriorityTasks);
router.get("/tasks/priority/critical", getCriticalPriorityTasks);
router.put('/tasks/:taskId/status', updateTaskStatus);

export default router;
