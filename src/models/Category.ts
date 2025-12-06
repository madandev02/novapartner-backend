import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  active: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
