// models/GameUnderAmbiguity.js
import mongoose from 'mongoose';

const GameUnderAmbiguitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // 每个用户只能提交一次
  },
  
  // 8个回合的答案
  answers: [{
    roundNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 8
    },
    choice: {
      type: String,
      required: true,
      enum: ['A', 'B']  // 只能是A或B
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // 提交时间
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GameUnderAmbiguity', GameUnderAmbiguitySchema);