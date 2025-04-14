import axios from "axios";
import { NoteType } from "../redux/features/notesSlice";

// Base URL for the notes API
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
  getNotes: async () => {
    try {
      const token = JSON.parse(localStorage.getItem("notes-app"))?.token;
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  createNotes: async (
    title: string,
    details: string,
    color: string,
    fontColor: string,
    category: string,
    date: string
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("notes-app"))?.token;
      const response = await axios.post(
        API_URL,
        { title, details, color, fontColor, category, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating notes:", error);
      throw error;
    }
  },

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
      const token = JSON.parse(localStorage.getItem("notes-app"))?.token;
      const response = await axios.put(
        `${API_URL}/${id}`,
        { title, details, color, fontColor, category, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notes:", error);
      throw error;
    }
  },

  deleteNotes: async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("notes-app"))?.token;
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting notes:", error);
      throw error;
    }
  },
};