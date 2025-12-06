import { Request, Response, NextFunction } from "express";
import { Provider } from "../../../models/Provider";
import {
  providerCreateSchema,
  providerUpdateSchema
} from "./provider.schemas";

export const createProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = providerCreateSchema.parse(req.body);
    const provider = await Provider.create(parsed);
    res.status(201).json({ provider });
  } catch (error) {
    next(error);
  }
};

export const getProviders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const providers = await Provider.find().populate("category", "name");
    res.json({ providers });
  } catch (error) {
    next(error);
  }
};

export const getProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = await Provider.findById(req.params.id).populate("category", "name");
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ provider });
  } catch (error) {
    next(error);
  }
};

export const updateProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = providerUpdateSchema.parse(req.body);
    const provider = await Provider.findByIdAndUpdate(req.params.id, parsed, {
      new: true
    });
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ provider });
  } catch (error) {
    next(error);
  }
};

export const deleteProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    next(error);
  }
};
