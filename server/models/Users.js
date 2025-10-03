import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  demographic: {
    studentid: { 
      type: Number, 
      required: true 
    },
    age: { 
      type: Number, 
      required: true 
    },
    gender: { 
      type: String, 
      required: true 
    },
    education: { 
      type: String, 
      required: true 
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
  }
});

export default mongoose.model('users', UserSchema);
