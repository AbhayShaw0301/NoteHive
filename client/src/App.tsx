import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Notes from "./components/Notes";
import { Note as NoteModels } from "./models/note";
import styles from "./styles/NotesPage.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModels[]>([]);
  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
      });
      const notes = await response.json();
      setNotes(notes);
    }
    loadNotes();
  }, []);
  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Notes note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
