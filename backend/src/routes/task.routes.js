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
  getBajaPriorityTasks,
  getMediaPriorityTasks,
  getAltaPriorityTasks,
  getCriticaPriorityTasks,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/task", createTask);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.get("/tasks/pending", getPendingTasks);
router.get("/tasks/in-progress", getInProgressTasks);
router.get("/tasks/completed", getCompletedTasks);
router.get("/tasks/priority/baja", getBajaPriorityTasks);
router.get("/tasks/priority/media", getMediaPriorityTasks);
router.get("/tasks/priority/alta", getAltaPriorityTasks);
router.get("/tasks/priority/critica", getCriticaPriorityTasks);

export default router;
