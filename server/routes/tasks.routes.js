import express from 'express';
import {
    validateTask,
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} from '../controllers/tasks.controller.js'; 
import protectRoute from '../middleware/protectRoute.js'; 

const router = express.Router();

// Get all tasks
router.get('/', protectRoute, getAllTasks); 

// Create a new task
router.post('/', protectRoute, validateTask, createTask); 

// Get a task by ID
router.get('/:id', protectRoute, getTaskById); 

// Update a task
router.put('/:id', protectRoute, updateTask); 

// Delete a task
router.delete('/:id', protectRoute, deleteTask); 

export default router;
