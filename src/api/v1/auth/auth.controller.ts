import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../../models/User";
import {
  loginSchema,
  refreshSchema,
  registerSchema
} from "./auth.schemas";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../../../utils/jwt";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = registerSchema.parse(req.body);

    const existing = await User.findOne({ email: parsed.email });
    if (existing) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const hashed = await bcrypt.hash(parsed.password, 10);

    const user = await User.create({
      email: parsed.email,
      name: parsed.name,
      password: hashed,
      role: parsed.role || "OPERATOR"
    });

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const user = await User.findOne({ email: parsed.email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isValid = await bcrypt.compare(parsed.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = refreshSchema.parse(req.body);

    const payload = verifyRefreshToken(parsed.refreshToken);

    const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
    const newRefreshToken = signRefreshToken({
      sub: payload.sub,
      role: payload.role
    });

    return res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ user });
  } catch (error) {
    next(error);
  }
};
