import mongoose from 'mongoose';

const ConfirmationBiasGameSchema = new mongoose.Schema({
  // 关联用户ID
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true // 确保每个用户只能提交一次
  },
  
  // 立场问题
  stanceTech: {
    type: String,
    required: true,
    enum: ['support', 'oppose']
  },
  stanceEcon: {
    type: String,
    required: true,
    enum: ['support', 'oppose']
  },
  
  // 确认偏见问题
  confirmBiasTech: {
    type: String,
    required: true,
    enum: ['support', 'oppose']
  },
  confirmBiasEcon: {
    type: String,
    required: true,
    enum: ['support', 'oppose']
  },
  
  // 评估偏见问题（1-5分）
  evalBiasTechSupport: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  evalBiasTechOppose: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  evalBiasEconSupport: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  evalBiasEconOppose: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  // 提交时间
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ConfirmationBiasGameSurvey', ConfirmationBiasGameSchema);