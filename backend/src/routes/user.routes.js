import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);

export default router;
