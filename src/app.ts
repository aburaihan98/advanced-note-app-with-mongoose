import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { notesRotes } from "./app/controllers/notes.controller";
import { usersRotes } from "./app/controllers/user.controller";

const app: Application = express();
app.use(express.json());
app.use("/notes", notesRotes);
app.use("/users", usersRotes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to user app");
});

export default app;
