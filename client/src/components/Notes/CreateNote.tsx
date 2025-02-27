import React from "react";
import NoteContainer from "../Notes/NoteContainer";

const CreateNote = (props) => (
  <NoteContainer toggleStyle={props.toggleStyle} isEditMode={false} />
);

export default CreateNote;
