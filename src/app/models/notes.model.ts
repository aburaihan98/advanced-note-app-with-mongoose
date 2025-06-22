import mongoose from "mongoose";
import { INotes } from "../interfaces/note.interface";

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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = mongoose.model<INotes>("Note", noteSchema);
