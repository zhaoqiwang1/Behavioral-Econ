import mongoose from 'mongoose';

const MBTISurveySchema = new mongoose.Schema({
  // 关联用户ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true // 确保每个用户只能提交一次
  },
  
  // MBTI测试结果
  mbtiAnswers: {
    type: String,
    required: true
  },
  // 提交时间建立
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MBTISurvey', MBTISurveySchema);