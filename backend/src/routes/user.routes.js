import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  assignTasksToUser,
  getUserTasks,
  removeTasksFromUser,getUserProjects
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/users/assign-task", assignTasksToUser);
router.post("/users/remove-tasks", removeTasksFromUser);
router.get("/user/:id/tasks", getUserTasks);
router.get("/user/:id/projects", getUserProjects);

export default router;
