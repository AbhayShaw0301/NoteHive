import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { Note as NoteModels } from "../models/note";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModels;
  className?: string;
}
const Notes = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated at " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created at " + formatDate(createdAt);
  }
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <CardBody className={styles.cardBody}>
        <CardTitle>{title}</CardTitle>
        <CardText className={styles.CardText}>{text}</CardText>
      </CardBody>
      <CardFooter className="text-muted">{createdUpdatedText}</CardFooter>
    </Card>
  );
};

export default Notes;
