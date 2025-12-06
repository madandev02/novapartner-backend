import { Request, Response, NextFunction } from "express";
import { Contract, calculateContractStatus } from "../../../models/Contract";
import {
  contractCreateSchema,
  contractUpdateSchema,
} from "./contract.schemas";
import { ZodError } from "zod";

// 📌 Crear contrato
export const createContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = contractCreateSchema.parse(req.body);

    const status = calculateContractStatus(new Date(parsed.endDate));
    const contract = await Contract.create({ ...parsed, status });

    await contract.populate("provider", "name");
    await contract.populate("category", "name");

    return res.status(201).json({ contract });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.errors,
      });
    }
    next(error);
  }
};

// 📌 Listar todos los contratos
export const getContracts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contracts = await Contract.find()
      .populate("provider", "name")
      .populate("category", "name");

    return res.json({ contracts });
  } catch (error) {
    next(error);
  }
};

// 📌 Obtener contrato por ID
export const getContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate("provider", "name")
      .populate("category", "name");

    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    return res.json({ contract });
  } catch (error) {
    next(error);
  }
};

// 📌 Actualizar contrato
export const updateContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = contractUpdateSchema.parse(req.body);

    if (parsed.endDate) {
      parsed.status = calculateContractStatus(new Date(parsed.endDate));
    }

    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      parsed,
      { new: true }
    )
      .populate("provider", "name")
      .populate("category", "name");

    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    return res.json({ contract });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: error.errors,
      });
    }
    next(error);
  }
};

// 📌 Eliminar contrato
export const deleteContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    return res.json({ message: "Contrato eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
