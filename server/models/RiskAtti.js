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
  riskScore: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  // 提交时间建立
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('RiskAttiSurvey', RiskAttiSurveySchema);