import { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const EditableSpan = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.title || "");

  if (typeof props.title !== "string") {
    return <span>Error: Title must be a string</span>;
  }

  // Function to activate edit mode and set the title to the current prop value
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title || "");
  };

  // Function to deactivate edit mode and call the onChange prop with the new title
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  // Function to handle text input changes
  const onChangeText = (e) => {
    setTitle(e.target.value);
  };

  // Render the component based on edit mode state
  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeText}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};

// PropTypes for type-checking the props
EditableSpan.propTypes = {
  title: PropTypes.string.isRequired, // title is a required string
  onChange: PropTypes.func.isRequired, // onChange is a required function
};

export default EditableSpan;
