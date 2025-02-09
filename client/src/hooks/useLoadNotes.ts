import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { notesAPI } from "../api/notes-api";
import { NoteType, setNotes } from "../redux/features/notesSlice";

const useLoadNotes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const notes = useSelector((state: RootState) => state.notes.notes);

  // useEffect to load notes when the component mounts
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
          dispatch(setNotes(JSON.parse(savedNotes) as NoteType[]));
        } else {
          const fetchedNotes = await notesAPI.getNotes();
          if (fetchedNotes) {
            dispatch(setNotes(fetchedNotes));
            localStorage.setItem("notes", JSON.stringify(fetchedNotes));
          } else {
            throw new Error("Invalid data received from the API");
          }
        }
      } catch (error) {
        console.error("Error when uploading notes:", error);
        setError("Error when uploading notes");
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [dispatch]);

  return { loading, error, notes };
};

export default useLoadNotes;
