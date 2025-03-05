import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  assignTasksToUser,
  getUserTasks,
  removeTasksFromUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/users/assign-task", assignTasksToUser);
router.post("/users/remove-tasks", removeTasksFromUser);
router.get("/user/:id/tasks", getUserTasks);

export default router;
