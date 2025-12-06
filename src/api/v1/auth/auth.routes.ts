/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login exitoso
 */

import { Router } from "express";
import { login, me, refreshToken, register } from "./auth.controller";
import { authRequired } from "../../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/me", authRequired, me);

export default router;
