import { body, validationResult } from 'express-validator';
import Task from '../models/task.model.js';

// Validation for tasks
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'), // Title must not be empty
];

// Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  const userId = req.user._id; // Get logged-in user's ID
  try {
    const tasks = await Task.find({ userId }); // Find tasks by userId
    return res.json(tasks); // Return tasks
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const task = await Task.create({ ...req.body, userId: req.user._id }); // Create task with userId
    return res.status(201).json(task); // Return created task
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id }); // Check userId
    if (task) {
      return res.json(task); // Return task
    }
    res.status(404).send('Task not found'); // Task not found
  } catch (error) {
    console.log('Error in getTaskById controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true }); // Update task
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); // Task not found
    }
    return res.json(task); // Return updated task
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user._id }); // Check userId
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); // Task not found
    }
    return res.status(204).end(); // No content
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { validateTask };

