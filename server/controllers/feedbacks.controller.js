import { validationResult, body } from 'express-validator';
import Feedback from '../models/feedback.model.js';

// Validation for feedback
const createFeedbackValidator = [
  body('title').isLength({ min: 1 }).withMessage('Title is required'), // Title must be present
];

export const validateFeedback = createFeedbackValidator;

// Get all feedbacks for the logged-in user
export const getAllFeedbacks = async (req, res) => {
  const userId = req.user._id; // Get logged-in user's ID
  try {
    const feedbacks = await Feedback.find({ userId }); // Find feedbacks by userId
    return res.json(feedbacks); // Return feedbacks
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const feedback = await Feedback.create({ ...req.body, userId: req.user._id }); // Create feedback with userId
    return res.status(201).json(feedback); // Return created feedback
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findOneAndDelete({ _id: id, userId: req.user._id }); // Check userId
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' }); // Feedback not found
    }
    return res.status(204).end(); // No content
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Check userId
      req.body,
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' }); // Feedback not found
    }
    return res.json(feedback); // Return updated feedback
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

