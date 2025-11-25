// Moral Foundations Questionnaire Survey
import mongoose from 'mongoose';

const MFQSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true  // 确保每个用户只能回答一次
  },
  
  // 32个问题的答案
  answers: [{
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 32
    },
    questionText: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 5  // 0到5分
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  gameSubmittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MFQSurvey', MFQSurveySchema);