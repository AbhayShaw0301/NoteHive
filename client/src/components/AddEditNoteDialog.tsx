import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";
import { NoteInput } from "../network/notes_api";
interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}
const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });
  async function onSubmit(Input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, Input);
      } else {
        noteResponse = await NotesApi.createNote(Input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <ModalTitle>{noteToEdit ? "Edit note" : "Add new note"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Title is Required" })}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditNoteDialog;
