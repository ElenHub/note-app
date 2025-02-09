import React from "react";
import NoteContainer from "../NoteContainer/NoteContainer";

const CreateNote = (props) => (
  <NoteContainer toggleStyle={props.toggleStyle} isEditMode={false} />
);

export default CreateNote;
