import express from "express";
import * as NotesControllers from "../controllers/notes";

const router = express.Router();

router.get("/", NotesControllers.getNotes);
router.get("/:id", NotesControllers.getNote);
router.post("/", NotesControllers.createNote);
router.patch("/:id", NotesControllers.updateNote);
// router.delete("/", NotesControllers.deleteNote);

export default router;
