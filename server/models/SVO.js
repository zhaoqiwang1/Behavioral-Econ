// SVO Survey
import mongoose from 'mongoose';

const SVOSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true  // 确保每个用户只能回答一次
  },
  
  // 6个问题的答案
  answers: [{
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },
    questionText: {
      type: String,
      required: true
    },
    selectedOption: {
      type: Number,
      required: true,
      min: 0,
      max: 8  // 9个选项，索引从0到8
    },
    selfAmount: {
      type: Number,
      required: true  // 用户自己获得的收益
    },
    otherAmount: {
      type: Number,
      required: true  // 他人获得的收益
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

export default mongoose.model('SVOSurvey', SVOSurveySchema);