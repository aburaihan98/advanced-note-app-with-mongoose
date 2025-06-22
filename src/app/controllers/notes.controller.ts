import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";
import { log } from "node:console";

export const notesRotes = express.Router();

notesRotes.post("/create-note", async (req: Request, res: Response) => {
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

notesRotes.get("/", async (req: Request, res: Response) => {
  const note = await Note.find().populate("user");

  res.json({
    message: "Get all note successfully",
    note,
  });
});

notesRotes.get("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;

  const note = await Note.findById(id);

  res.json({
    message: "Get single note successfully",
    note,
  });
});

notesRotes.patch("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;
  const updateDoc = req.body;
  const note = await Note.findByIdAndUpdate(id, updateDoc, { new: true });

  res.json({
    message: "Update single note successfully",
    note,
  });
});

notesRotes.delete("/:noteId", async (req: Request, res: Response) => {
  const id = req.params.noteId;

  const note = await Note.findByIdAndDelete(id, { new: true });

  res.json({
    message: "Delete single note successfully",
    note,
  });
});
