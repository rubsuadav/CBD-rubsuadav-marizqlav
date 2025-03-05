import { Router } from "express";
import { getAllUsers, getUserById, assignTaskToUser, getUserTasks } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/assign-task", assignTaskToUser);
router.get("/user/:id/tasks", getUserTasks);

export default router;
