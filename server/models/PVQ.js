import mongoose from 'mongoose';

const PVQSurveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true
  },
  
  answers: [{
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 40
    },
    questionText: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    }
  }],
  
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('PVQSurvey', PVQSurveySchema);