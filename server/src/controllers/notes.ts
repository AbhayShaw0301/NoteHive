import { RequestHandler } from "express";
import NoteModel from "../models/note";
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
export const updateNote: RequestHandler = async (req, res, next) => {
  const newTitle = req.body.title;
  const newText = req.body.text;
  const noteId = req.params.id;
  try {
    const note = await NoteModel.findById(noteId).updateOne({
      title: newTitle,
      text: newText,
    });
    res.status(200).json({ message: "Updated successfully", note });
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    await NoteModel.findByIdAndDelete(noteId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
