/**
 * @openapi
 * tags:
 *   name: Providers
 *   description: Gestión de proveedores
 */


import { Router } from "express";
import {
  createProvider,
  getProvider,
  getProviders,
  updateProvider,
  deleteProvider
} from "./provider.controller";
import { authRequired, requireRole } from "../../../middlewares/auth";

const router = Router();

// Rutas accesibles solo si estás logueado
router.use(authRequired);

router.get("/", getProviders);
router.get("/:id", getProvider);

// Solo Admin puede crear/editar/eliminar
router.post("/", requireRole("ADMIN"), createProvider);
router.put("/:id", requireRole("ADMIN"), updateProvider);
router.delete("/:id", requireRole("ADMIN"), deleteProvider);

export default router;
