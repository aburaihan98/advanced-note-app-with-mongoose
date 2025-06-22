import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { notesRotes } from "./app/controllers/notes.controller";

const app: Application = express();
app.use(express.json());
app.use("/notes", notesRotes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
