import { Request, Response, NextFunction } from "express";
import { Contract, calculateContractStatus } from "../../../models/Contract";

export const getDashboardStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contracts = await Contract.find()
      .populate("provider", "name")
      .populate("category", "name");

    // 🔹 Recalcular status en caso de contratos desactualizados
    let activeContracts = 0;
    let expiringSoon = 0;
    let expiredContracts = 0;

    const expiringList: Array<{ title: string; provider: string; endDate: Date }> = [];

    contracts.forEach((c) => {
      const newStatus = calculateContractStatus(c.endDate);

      if (c.status !== newStatus) {
        c.status = newStatus;
        c.save(); // 🔄 Auto-corrección silenciosa
      }

      switch (newStatus) {
        case "ACTIVE":
          activeContracts++;
          break;
        case "EXPIRING_SOON":
          expiringSoon++;
          expiringList.push({
            title: c.title,
            provider: (c.provider as any)?.name ?? "N/A",
            endDate: c.endDate,
          });
          break;
        case "EXPIRED":
          expiredContracts++;
          break;
      }
    });

    // 🔹 Ordenar por fecha de vencimiento (más urgente primero)
    expiringList.sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

    return res.json({
      totalContracts: contracts.length,
      activeContracts,
      expiringSoon,
      expiredContracts,
      expiringList,
    });
  } catch (error) {
    console.error("❌ Error en getDashboardStats:", error);
    next(error);
  }
};
