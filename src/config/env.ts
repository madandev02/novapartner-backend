import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "4000",
  MONGODB_URI: required(process.env.MONGODB_URI, "MONGODB_URI"),
  JWT_ACCESS_SECRET: required(process.env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: required(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET"),
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173"
};
