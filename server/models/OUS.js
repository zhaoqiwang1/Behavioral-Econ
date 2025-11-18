// Oxford Utilitarianism Scale Survey
import mongoose from 'mongoose';

const OUSSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true  // 确保每个用户只能回答一次
  },
  
  // 9个问题的答案
  answers: [{
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 9
    },
    questionText: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 7
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

export default mongoose.model('OUSSurvey', OUSSurveySchema);