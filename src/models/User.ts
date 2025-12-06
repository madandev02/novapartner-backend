import { Schema, model, Document } from "mongoose";

export type UserRole = "ADMIN" | "OPERATOR";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["ADMIN", "OPERATOR"],
      default: "OPERATOR",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const User = model<IUser>("User", userSchema);
