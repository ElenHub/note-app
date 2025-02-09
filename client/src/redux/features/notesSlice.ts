import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteType {
  id: string;
  title: string;
  details: string;
  date: string;
  color: string;
  fontColor: string;
  category: string;
}

export interface NotesState {
  notes: NoteType[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Setting the list of notes
    setNotes: (state, action: PayloadAction<NoteType[]>) => {
      state.notes = action.payload;
    },
    // Adding a new note
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload);
    },
    // Deleting a note by its ID
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    // Updating an existing note
    updateNote: (state, action: PayloadAction<NoteType>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
  },
});

export const { setNotes, addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
