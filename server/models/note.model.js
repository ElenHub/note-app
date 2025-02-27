import mongoose from 'mongoose';

// Create the note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    category: {
      type: String,
    },
    date: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Create the Note model
const Note = mongoose.model('Note', noteSchema);

export default Note;