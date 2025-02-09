import mongoose from 'mongoose';

// Create the user schema
const userSchema= new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true } 
);

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
