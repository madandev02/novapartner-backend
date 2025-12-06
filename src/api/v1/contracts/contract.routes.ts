/**
 * @openapi
 * tags:
 *   name: Contracts
 *   description: Gestión de contratos
 */


import { Router } from "express";
import {
  createContract,
  deleteContract,
  getContract,
  getContracts,
  updateContract
} from "./contract.controller";
import { authRequired, requireRole } from "../../../middlewares/auth";

const router = Router();

router.use(authRequired);

// Lista y detalles → Admin y Operador
router.get("/", getContracts);
router.get("/:id", getContract);

// Crear, actualizar, eliminar → Solo Admin
router.post("/", requireRole("ADMIN"), createContract);
router.put("/:id", requireRole("ADMIN"), updateContract);
router.delete("/:id", requireRole("ADMIN"), deleteContract);

export default router;
