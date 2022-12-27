import { Document, model, Schema } from "mongoose";

export interface ResetUserDocument extends Document {
  email: string;
  token: string;
}

const resetUserSchema = new Schema<ResetUserDocument>({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true, // Each Token should be unique.
    required: true
  }
});

export const ResetUserModel = model<ResetUserDocument>('reset', resetUserSchema);
