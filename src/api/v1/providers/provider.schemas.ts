import { z } from "zod";

export const providerCreateSchema = z.object({
  name: z.string().min(2, "Nombre obligatorio").max(120),
  email: z.string().email().optional(),
  phone: z.string().min(6).max(20).optional(),
  category: z.string().optional()
});

export const providerUpdateSchema = providerCreateSchema.partial();

export type ProviderCreateInput = z.infer<typeof providerCreateSchema>;
export type ProviderUpdateInput = z.infer<typeof providerUpdateSchema>;
