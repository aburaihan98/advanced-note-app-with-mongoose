import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Other"],
      default: "Personal",
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

export const Note = mongoose.model("Note", noteSchema);
