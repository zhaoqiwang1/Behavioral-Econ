import mongoose from 'mongoose';

const RiskAttiSurveySchema = new mongoose.Schema({
  // 关联用户ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true // 确保每个用户只能提交一次
  },
  
  // 风险评估答案
  riskAttitude: {
    type: Number,
    required: true
  },
  // 提交时间建立
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('RiskAttiSurvey', RiskAttiSurveySchema);