import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

const app: Application = express();
app.use(express.json());

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

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

app.post("/notes/create-note", async (req: Request, res: Response) => {
  // approach-1
  // const myNote = new Note({
  //   name: " Mongoose ",
  //   content: "I am learning mongoose",
  //   tags: {
  //     label: "Database",
  //   },
  // });
  // await myNote.save();

  // approach-2
  const body = req.body;

  const note = await Note.create(body);

  res.json({
    message: "Created note successfully",
    data: body,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const note = await Note.find();

  res.json({
    message: "Get all note successfully",
    note,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;

  const note = await Note.findById(id);

  res.json({
    message: "Get single note successfully",
    note,
  });
});

app.patch("/notes-update/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updateDoc = req.body;
  const note = await Note.findByIdAndUpdate(id, updateDoc, { new: true });

  res.json({
    message: "Update single note successfully",
    note,
  });
});

app.delete("/notes-delete/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;

  const note = await Note.findByIdAndDelete(id, { new: true });

  res.json({
    message: "Delete single note successfully",
    note,
  });
});

export default app;
