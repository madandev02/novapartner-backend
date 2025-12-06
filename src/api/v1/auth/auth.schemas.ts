import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80),
  password: z.string().min(6).max(100),
  role: z.enum(["ADMIN", "OPERATOR"]).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
