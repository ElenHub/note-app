import { body, validationResult } from 'express-validator';
import Note from '../models/note.model.js';

// Validation for notes
const validateNotes = [
  body('title').isLength({ min: 1 }).withMessage('Title is required'),
  body('details').isLength({ min: 1 }).withMessage('Details are required'),
];

// Error handling middleware
const handleError = (res, error, statusCode) => {
  res.status(statusCode).json({ message: error.message });
};

// Get all notes for the logged-in user
export const getAllNotes = async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized - No user found' });
    return; 
  }

  try {
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new note
export const createNotes = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, details, color, fontColor, category, date } = req.body;
  const userId = req.user?._id;

  const note = new Note({
    title,
    details,
    color,
    fontColor,
    category,
    date,
    userId,
  });

  try {
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    handleError(res, error);
  }
};

// Get note by ID
export const getNotesById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    handleError(res, error);
  }
};

// Update note
export const updateNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (!note || note.userId.toString() !== req.user?._id.toString()) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNote);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete note
export const deleteNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    if (!note || note.userId.toString() !== req.user?._id.toString()) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    await Note.findByIdAndDelete(noteId);
    res.status(204).end(); 
  } catch (error) {
    handleError(res, error);
  }
};

export { validateNotes };
