import { body, validationResult } from 'express-validator';
import Task from "../models/task.model.js"

// Validation for tasks
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'), 
];

// Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  const userId = req.user._id; 
  try {
    const tasks = await Task.find({ userId }); 
    return res.json(tasks); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }

    const task = await Task.create({ ...req.body, userId: req.user._id }); 
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id }); 
    if (task) {
      return res.json(task);
    }
    res.status(404).send('Task not found');
  } catch (error) {
    console.log('Error in getTaskById controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true }); 
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); 
    }
    return res.json(task); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user._id }); 
    if (!task) {
      return res.status(404).json({ message: 'Task not found' }); 
    }
    return res.status(204).end(); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { validateTask };

