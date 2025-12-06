import { z } from "zod";

export const contractCreateSchema = z.object({
  provider: z.string().min(1, "Proveedor obligatorio"),
  category: z.string().min(1, "Categoría obligatoria"),
  title: z.string().min(3, "Título requerido"),

  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }),

  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }),

  cost: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "El costo debe ser positivo")
  ),
})
.refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  {
    message: "La fecha de fin no puede ser anterior al inicio",
    path: ["endDate"],
  }
);

export const contractUpdateSchema = contractCreateSchema.partial();

export type ContractCreateInput = z.infer<typeof contractCreateSchema>;
export type ContractUpdateInput = z.infer<typeof contractUpdateSchema>;
