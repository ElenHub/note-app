import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesAPI } from "../api/notes-api";
import {
  addNote,
  deleteNote,
  NoteType,
  setNotes,
  updateNote,
} from "../redux/features/notesSlice";
import { RootState } from "../store/store";

const useNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes) || [];

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await notesAPI.getNotes();
        dispatch(setNotes(fetchedNotes));
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadNotes();
  }, [dispatch, notes]);

  // Function to create a new note
  const createNote = async (note: NoteType) => {
    try {
      const newNote = await notesAPI.createNotes(
        note.title,
        note.details,
        note.color,
        note.fontColor,
        note.category,
        note.date
      );
      dispatch(addNote(newNote));
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Function to remove a note by ID
  const removeNote = async (id: string) => {
    try {
      await notesAPI.deleteNotes(id);
      dispatch(deleteNote(id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to update an existing note
  const updateNoteAsync = async (noteData: NoteType) => {
    try {
      const updatedNote = await notesAPI.updateNotes(
        noteData.id,
        noteData.title,
        noteData.details,
        noteData.color,
        noteData.fontColor,
        noteData.category,
        noteData.date
      );
      dispatch(updateNote(updatedNote));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return { notes, createNote, removeNote, updateNoteAsync };
};

export default useNotes;
