import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNoteDialog from "./components/AddNoteDialog";
import Notes from "./components/Notes";
import { Note as NoteModels } from "./models/note";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModels[]>([]);
  const [showAddNotes, setShowAddNotes] = useState(false);
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
  return (
    <Container>
      <Button onClick={() => setShowAddNotes(true)}>Add Note</Button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes note={note} className={styles.note} />
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
    </Container>
  );
};

export default App;
