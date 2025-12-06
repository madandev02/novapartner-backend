import { Schema, model, Document, Types } from "mongoose";

export interface IProvider extends Document {
  name: string;
  email?: string;
  phone?: string;
  category?: Types.ObjectId;
  active: boolean;
}

const providerSchema = new Schema<IProvider>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Provider = model<IProvider>("Provider", providerSchema);
