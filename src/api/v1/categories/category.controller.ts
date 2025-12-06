import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/Category";
import {
  categoryCreateSchema,
  categoryUpdateSchema
} from "./category.schemas";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = categoryCreateSchema.parse(req.body);

    const existing = await Category.findOne({ name: parsed.name });
    if (existing) {
      return res.status(409).json({ message: "La categoría ya existe" });
    }

    const category = await Category.create(parsed);
    res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json({ category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = categoryUpdateSchema.parse(req.body);

    const category = await Category.findByIdAndUpdate(req.params.id, parsed, { new: true });
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json({ category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};
