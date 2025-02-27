import React, { useState } from "react";

import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";

import useNotes from "../../hooks/useNotes";
import { ToggleStyleType } from "../../types/type";
import { BackButton } from "../UI/BackButton";
import CategoryColorSelector from "../Forms/CategoryColorSelector";
import NoteForm from "./NoteForm";

// Define the structure of a Note object
export interface Note {
  id: string;
  title: string;
  details: string;
  fontColor: string;
  color: string;
  category: string;
  date: string;
}

// Define the props interface for the NoteContainer component
interface NoteContainerProps {
  isEditMode: boolean;
  initialNote?: Note;
  toggleStyle: ToggleStyleType;
}

// Functional component for creating or editing notes
const NoteContainer: React.FC<NoteContainerProps> = ({
  isEditMode,
  initialNote,
  toggleStyle,
}) => {
  const { createNote, updateNoteAsync } = useNotes();
  const { id } = useParams<{ id: string }>(); 
  const [title, setTitle] = useState<string>(
    initialNote ? initialNote.title : ""
  );
  const [details, setDetails] = useState<string>(
    initialNote ? initialNote.details : ""
  );
  const [errors, setErrors] = useState<{ title?: string; details?: string }>(
    {}
  );
  const [color, setColor] = useState<string>("#ffffff");
  const [fontColor, setFontColor] = useState<string>(
    initialNote ? initialNote.fontColor : "#000000"
  );
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [category, setCategory] = useState<string>(
    initialNote ? initialNote.category : ""
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate the form inputs
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required"; 
    if (!details.trim()) newErrors.details = "Details are required"; 
    setErrors(newErrors); 
    return !newErrors.title && !newErrors.details; 
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (validateForm() && !loading) {
      setLoading(true); 
      const noteData: Note = {
        id: isEditMode ? initialNote._id : uuidv4(), 
        title,
        details,
        fontColor,
        color,
        category,
        date: selectedDate.format("YYYY-MM-DD"), 
      };
      try {
        if (isEditMode) {
          await updateNoteAsync(noteData); 
        } else {
          await createNote(noteData); 
        }
        toast.success(
          `The note has been successfully ${
            isEditMode ? "updated" : "created"
          }!`
        ); 
        navigate("/"); 
      } catch (error) {
        toast.error("Error saving note. Please try again.");
      } finally {
        setLoading(false); 
      }
    }
  };

  // Function to handle input changes
  const handleChange = (field: "title" | "details", value: string) => {
    if (field === "title") {
      setTitle(value);
      setErrors((prevErrors) => ({ ...prevErrors, title: "" })); 
    }
    if (field === "details") {
      setDetails(value);
      setErrors((prevErrors) => ({ ...prevErrors, details: "" }));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <BackButton toggleStyle={toggleStyle} /> 
      <Paper
        elevation={3}
        sx={{ padding: 3, borderRadius: 4, backgroundColor: "white" }}
      >
        <Typography
          variant="h5"
          sx={{ color: toggleStyle.textColor, marginBottom: 2 }}
        >
          {isEditMode ? "Edit a note" : "Create a new note"}{" "}
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
            <CircularProgress sx={{ color: "orange" }} />{" "}
          </Box>
        )}
        <NoteForm
          title={title}
          details={details}
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
          fontColor={fontColor}
          toggleStyle={toggleStyle}
        />
        <CategoryColorSelector
          fontColor={fontColor}
          setColor={setColor}
          setFontColor={setFontColor}
          toggleStyle={toggleStyle}
          isEditMode={isEditMode}
          category={category}
          setCategory={setCategory}
        />
      </Paper>
    </Box>
  );
};

export default NoteContainer;
