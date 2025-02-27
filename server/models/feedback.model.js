import mongoose from 'mongoose';

// Create the feedback schema
const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
  },
  { timestamps: true }
);

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;

