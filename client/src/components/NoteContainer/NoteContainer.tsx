import React, { useState } from 'react';

import dayjs from 'dayjs';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

import useNotes from '../../hooks/useNotes'; 
import { ToggleStyleType } from '../../types/type'; 
import { BackButton } from '../BackButton/BackButton'; 
import CategoryColorSelector
  from '../CategoryColorSelector/CategoryColorSelector'; 
import NoteForm from '../NoteForm/NoteForm'; 

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
  const { createNote, updateNoteAsync } = useNotes(); // Destructure note functions from the custom hook
  const { id } = useParams<{ id: string }>(); // Get the note ID from URL parameters
  // State variables for note properties
  const [title, setTitle] = useState<string>(initialNote ? initialNote.title : "");
  const [details, setDetails] = useState<string>(initialNote ? initialNote.details : "");
  const [errors, setErrors] = useState<{ title?: string; details?: string }>({});
  const [color, setColor] = useState<string>("#ffffff");
  const [fontColor, setFontColor] = useState<string>(initialNote ? initialNote.fontColor : "#000000");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [category, setCategory] = useState<string>(initialNote ? initialNote.category : "");
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to validate the form inputs
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required"; // Check if title is empty
    if (!details.trim()) newErrors.details = "Details are required"; // Check if details are empty
    setErrors(newErrors); // Update errors state
    return !newErrors.title && !newErrors.details; // Return true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm() && !loading) { // Validate form and check loading state
      setLoading(true); // Set loading state to true
      const noteData: Note = {
        id: isEditMode ? initialNote._id : uuidv4(),  // Use existing ID for editing, or generate a new one
        title,
        details,
        fontColor,
        color,
        category,
        date: selectedDate.format("YYYY-MM-DD"), // Format date for storage
      };
      try {
        if (isEditMode) {
          await updateNoteAsync(noteData); // Update existing note
        } else {
          await createNote(noteData); // Create a new note
        }
        toast.success(`The note has been successfully ${isEditMode ? 'updated' : 'created'}!`); // Show success message
        navigate("/"); // Navigate back to the main page
      } catch (error) {
        toast.error("Error saving note. Please try again."); // Show error message
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  // Function to handle input changes
  const handleChange = (field: "title" | "details", value: string) => {
    if (field === "title") {
      setTitle(value);
      setErrors((prevErrors) => ({ ...prevErrors, title: "" })); // Clear title error
    }
    if (field === "details") {
      setDetails(value);
      setErrors((prevErrors) => ({ ...prevErrors, details: "" })); // Clear details error
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <BackButton toggleStyle={toggleStyle} /> {/* Back button */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4, backgroundColor: 'white' }}>
        <Typography variant="h5" sx={{ color: toggleStyle.textColor, marginBottom: 2 }}>
          {isEditMode ? "Edit a note" : "Create a new note"} {/* Title based on mode */}
        </Typography>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
            <CircularProgress sx={{ color: 'orange' }} /> {/* Loading spinner */}
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

