import { Router } from "express";
import {createTask,  getTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.post("/task", createTask);
router.get("/tasks", getTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
