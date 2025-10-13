import mongoose from 'mongoose';

const PublicGoodsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true  // 确保每个用户只能有一个记录
  },
  
  // 20个回合的答案
  answers: [{
    round: {
      type: Number,
      required: true,
      min: 1,
      max: 20
    },
    contribution: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// 确保每个用户每个回合只能提交一次（在数组内唯一）
PublicGoodsSchema.index({ userId: 1, "answers.round": 1 }, { unique: true });

export default mongoose.model('PublicGoodsSurvey', PublicGoodsSchema);