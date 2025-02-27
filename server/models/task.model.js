import mongoose from 'mongoose';

// Create the task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
  },
  { timestamps: true }
);

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;
