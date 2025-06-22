import { INotes } from "../interfaces/note.interface";
import mongoose, { Schema, Types } from "mongoose";

const noteSchema = new mongoose.Schema<INotes>(
  {
    name: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "Green" },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = mongoose.model<INotes>("Note", noteSchema);
