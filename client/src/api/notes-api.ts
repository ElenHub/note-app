import axios from "axios";
import { NoteType } from "../redux/features/notesSlice";

// Base URL for the tasks API
const API_URL =
  import.meta.env.NODE_ENV === "development"
    ? import.meta.env.VITE_API_NOTES
    : "/api/notes";

export interface NotesAPI {
  getNotes: () => Promise<NoteType[]>;
  createNotes: (
    title: string,
    details: string,
    color: string,
    fontColor: string,
    category: string,
    date: string
  ) => Promise<NoteType>;
  deleteNotes: (id: string) => Promise<void>;
  updateNotes: (
    id: string,
    title: string,
    details: string,
    color: string,
    fontColor: string,
    category: string,
    date: string
  ) => Promise<NoteType | null>;
}

export const notesAPI: NotesAPI = {
  // Fetch all notes from the API
  getNotes: async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  // Create a new note
  createNotes: async (
    title: string,
    details: string,
    color: string,
    fontColor: string,
    category: string,
    date: string
  ) => {
    try {
      const response = await axios.post(
        API_URL,
        { title, details, color, fontColor, category, date },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating notes:", error);
      throw error;
    }
  },

  // Update an existing note by its ID
  updateNotes: async (
    id: string,
    title: string,
    details: string,
    color: string,
    fontColor: string,
    category: string,
    date: string
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { title, details, color, fontColor, category, date },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notes:", error);
      throw error;
    }
  },

  // Delete a note by its ID
  deleteNotes: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    } catch (error) {
      console.error("Error deleting notes:", error);
      throw error;
    }
  },
};
