/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Gestión de categorías
 */


import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory
} from "./category.controller";
import { authRequired, requireRole } from "../../../middlewares/auth";

const router = Router();

router.use(authRequired);

// Lectura → Admin y Operator
router.get("/", getCategories);
router.get("/:id", getCategory);

// Crear / Editar / Eliminar → Solo Admin
router.post("/", requireRole("ADMIN"), createCategory);
router.put("/:id", requireRole("ADMIN"), updateCategory);
router.delete("/:id", requireRole("ADMIN"), deleteCategory);

export default router;
