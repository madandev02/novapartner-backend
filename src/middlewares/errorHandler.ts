import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("❌ Error:", err.message ?? err);

  const status = err.status || 500;
  const message =
    err.message && typeof err.message === "string"
      ? err.message
      : "Error interno del servidor";

  res.status(status).json({ message });
};
