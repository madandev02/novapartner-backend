import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./api/v1/auth/auth.routes";
import providerRoutes from "./api/v1/providers/provider.routes";
import categoryRoutes from "./api/v1/categories/category.routes";
import contractRoutes from "./api/v1/contracts/contract.routes"; // ⬅ SE AGREGA
import dashboardRoutes from "./api/v1/dashboard/dashboard.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "nova-partner-api" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API v1
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/providers", providerRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/contracts", contractRoutes); // ⬅ SE AGREGA
app.use("/api/v1/dashboard", dashboardRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;
