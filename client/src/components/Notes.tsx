import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Note as NoteModels } from "../models/note";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModels;
  onNoteClick: (note: NoteModels) => void;
  onDeleteNoteClicked: (note: NoteModels) => void;
  className?: string;
}
const Notes = ({
  note,
  className,
  onDeleteNoteClicked,
  onNoteClick,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated at " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created at " + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClick(note)}
    >
      <CardBody className={styles.cardBody}>
        <CardTitle className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </CardTitle>
        <CardText className={styles.CardText}>{text}</CardText>
      </CardBody>
      <CardFooter className="text-muted">{createdUpdatedText}</CardFooter>
    </Card>
  );
};

export default Notes;
