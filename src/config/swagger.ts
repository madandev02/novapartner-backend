import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NovaPartner API",
      version: "1.0.0",
      description: "API de gestión de proveedores, categorías y contratos"
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/api/v1/**/*.routes.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);
