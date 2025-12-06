import bcrypt from "bcryptjs";
import { User } from "../models/User";

export const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "ADMIN" });
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await User.create({
    email: "admin@nova.cl",
    name: "Administrador",
    password: hashedPassword,
    role: "ADMIN"
  });

  console.log("✨ Admin creado automáticamente → admin@nova.cl / Admin123!");
};
