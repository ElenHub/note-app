import React from "react";
import { useParams } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import NoteContainer from "../Notes/NoteContainer";

const EditNote = (props) => {
  const { id } = useParams();
  const { notes } = useNotes();

  console.log("Notes:", notes);
  console.log("ID from params:", id);

  const note = notes.find((note) => note._id && note._id.toString() === id);

  if (!note) {
    console.error("Note not found for ID:", id);
    return <p>Note not found</p>;
  }

  return (
    <NoteContainer
      toggleStyle={props.toggleStyle}
      isEditMode={true}
      initialNote={note}
    />
  );
};

export default EditNote;
