import { Schema, model, Document, Types } from "mongoose";

export type ContractStatus = "ACTIVE" | "EXPIRED" | "EXPIRING_SOON";

export interface IContract extends Document {
  provider: Types.ObjectId;
  category: Types.ObjectId;
  title: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}

// 🔹 Helper para calcular el estado según la fecha de término
export const calculateContractStatus = (endDate: Date): ContractStatus => {
  const now = new Date();

  if (endDate < now) {
    return "EXPIRED";
  }

  const diff = endDate.getTime() - now.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days <= 30) {
    return "EXPIRING_SOON";
  }

  return "ACTIVE";
};

const contractSchema = new Schema<IContract>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "EXPIRING_SOON"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export const Contract = model<IContract>("Contract", contractSchema);
