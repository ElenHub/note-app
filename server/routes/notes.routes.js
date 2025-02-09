import express from 'express'; 
import {
    validateNotes,
    getAllNotes,
    createNotes,
    getNotesById,
    updateNotes,
    deleteNotes,
} from '../controllers/notes.controller.js'; 
import protectRoute from '../middleware/protectRoute.js'; 

const router = express.Router();

// Get all notes
router.get('/', protectRoute, getAllNotes); 

// Create a new note
router.post('/', protectRoute, validateNotes, createNotes); 

// Get a note by ID
router.get('/:id', protectRoute, getNotesById); 

// Update a note
router.put('/:id', protectRoute, updateNotes); 

// Delete a note
router.delete('/:id', protectRoute, deleteNotes); 

export default router;

