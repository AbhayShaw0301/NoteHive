import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {
  default as AddEditNoteDialog,
  default as AddNoteDialog,
} from "./components/AddEditNoteDialog";
import Notes from "./components/Notes";
import { Note as NoteModels } from "./models/note";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModels[]>([]);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModels | null>(null);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        alert(error);
      }
    }
    loadNotes();
  }, []);
  async function deleteNote(note: NoteModels) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNotes(true)}
      >
        <FaPlus />
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes
              note={note}
              className={styles.note}
              onNoteClick={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNotes && (
        <AddNoteDialog
          onDismiss={() => setShowAddNotes(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNotes(false);
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updateNote._id ? updateNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
};

export default App;
