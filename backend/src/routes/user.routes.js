import { Router } from "express";

// local imports
import {
  getAllUsers,
  getUserById,
  assignTasksToUser,
  getUserTasks,
  removeTasksFromUser,
  getUserProjects,
} from "../controllers/user.controller.js";
import { authenticatedGuard } from "../middlewares/authenticatedGuard.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", authenticatedGuard, getUserById);
router.post("/users/assign-task", authenticatedGuard, assignTasksToUser);
router.post("/users/remove-tasks", authenticatedGuard, removeTasksFromUser);
router.get("/user/:id/tasks", getUserTasks);
router.get("/user/:id/projects", getUserProjects);

export default router;
