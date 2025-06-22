import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { Note } from "../models/notes.model";

export const usersRotes = express.Router();

usersRotes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;

  const user = await User.create(body);

  res.json({
    message: "Created user successfully",
    user,
  });
});

usersRotes.get("/", async (req: Request, res: Response) => {
  const user = await User.find();

  res.json({
    message: "Get all user successfully",
    user,
  });
});

usersRotes.get("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;

  const user = await User.findById(id);

  res.json({
    message: "Get single user successfully",
    user,
  });
});

usersRotes.patch("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;
  const updateDoc = req.body;
  const user = await User.findByIdAndUpdate(id, updateDoc, { new: true });

  res.json({
    message: "Update single user successfully",
    user,
  });
});

usersRotes.delete("/:userId", async (req: Request, res: Response) => {
  const id = req.params.userId;

  const user = await User.findByIdAndDelete(id, { new: true });

  res.json({
    message: "Delete single user successfully",
    user,
  });
});
