// models/OverconfidenceGame.js
const mongoose = require('mongoose');

const OverconfidenceGameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // 确保每个用户只能回答一次
  },
  
  // 10个问题的答案
  answers: [{
    questionNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    questionText: {
      type: String,
      required: true
    },
    lowerBound: {
      type: Number,
      required: true
    },
    upperBound: {
      type: Number,
      required: true
    }
  }]
});

// 添加索引以便快速查询
OverconfidenceGameSchema.index({ userId: 1 });

module.exports = mongoose.model('OverconfidenceGame', OverconfidenceGameSchema);