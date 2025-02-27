import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import useLoadNotes from "../../hooks/useLoadNotes";
import { NotesState } from "../../redux/features/notesSlice";
import Header from "../UI/Header";
import NoteItem from "../Notes/NoteItem";
import Search from "../UI/Search";

interface NoteProps {
  darkMode: boolean;
  handleToggleDarkMode: () => void;
  toggleStyle: {
    backgroundColor: string;
    textColor: string;
    iconHover: {
      backgroundColor: string;
    };
    iconColor: string;
  };
}

const Note: React.FC<NoteProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, notes } = useLoadNotes();
  const reduxNotes =
    useSelector((state: { notes: NotesState }) => state.notes.notes) || [];
  const filteredNotes = notes.filter(
    (note) =>
      note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        darkMode={props.darkMode}
        handleToggleDarkMode={props.handleToggleDarkMode}
        toggleStyle={props.toggleStyle}
      />
      <Search
        notes={filteredNotes}
        setSearchTerm={setSearchTerm}
        toggleStyle={props.toggleStyle}
      />
      {loading ? (
        // Show loading spinner while notes are being loaded
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : error ? (
        // Display error message if loading fails
        <Typography
          variant="body1"
          color="error"
          align="center"
          sx={{ margin: 2 }}
        >
          Error loading notes: {error}
        </Typography>
      ) : (
        <>
          {filteredNotes.length === 0 && (
            // Show message if no notes are found
            <Typography
              variant="body1"
              color={props.toggleStyle.textColor}
              align="center"
              sx={{ margin: 2 }}
            >
              No notes found
            </Typography>
          )}
          <Grid container spacing={2} sx={{ padding: 2 }}>
            {/* Map through filtered notes and render NoteItem for each */}
            {filteredNotes.map((note, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${note._id}-${index}`}>
                <NoteItem
                  note={note}
                  toggleStyle={props.toggleStyle}
                  sx={{
                    backgroundColor: props.toggleStyle.backgroundColor,
                    color: props.toggleStyle.textColor,
                    borderRadius: "8px",
                    boxShadow: 2,
                    padding: 2,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {/* Button to create a new note */}
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <IconButton
            sx={{
              ...props.toggleStyle,
              fontSize: "2rem",
              borderRadius: "50%",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: props.toggleStyle.iconHover.backgroundColor,
                transform: "scale(1.1)",
                transition: "0.2s",
              },
            }}
          >
            <AddIcon style={{ color: props.toggleStyle.iconColor }} />
          </IconButton>
        </Link>
      </Box>
    </>
  );
};

export default Note;
