import express from 'express';
import {
    validateFeedback,
    getAllFeedbacks,
    createFeedback,
    deleteFeedback,
    updateFeedback,
} from '../controllers/feedbacks.controller.js'; 
import protectRoute from '../middleware/protectRoute.js'; 

const router = express.Router();

// Get all feedbacks
router.get('/', protectRoute, getAllFeedbacks); 

// Create a new feedback
router.post('/', protectRoute, validateFeedback, createFeedback); 

// Update feedback
router.put('/:id', protectRoute, updateFeedback); 

// Delete feedback
router.delete('/:id', protectRoute, deleteFeedback); 

export default router;

