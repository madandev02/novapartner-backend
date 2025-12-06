/**
 * @openapi
 * tags:
 *   name: Dashboard
 *   description: KPIs y métricas ejecutivas
 */


import { Router } from "express";
import { getDashboardStats } from "./dashboard.controller";
import { authRequired } from "../../../middlewares/auth";

const router = Router();

router.use(authRequired);

// Admin + Operator pueden ver el dashboard
router.get("/stats", getDashboardStats);

export default router;
