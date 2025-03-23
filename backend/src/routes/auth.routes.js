import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { anonymousGuard } from "../middlewares/anonymousGuard.js";

const router = Router();

router.post("/register", anonymousGuard, register);
router.post("/login", anonymousGuard, login);

export default router;
