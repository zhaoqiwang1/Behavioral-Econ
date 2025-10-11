import express from 'express';
import UserModel from '../models/Users.js';
import AmbiguityAttiSurvey from '../models/AmbiguityAtti.js';
import mongoose from 'mongoose';

const router = express.Router();

// 提交风险评估答案
router.post('/submit', async (req, res) => {
  try {
    const { userId, ambiguityAttitude } = req.body;
    
    console.log('收到的 userId:', userId);
  
    // 转换 userId 为 ObjectId
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
      console.log('转换后的 userObjectId:', userObjectId);
    } catch (error) {
      console.error('ObjectId 转换错误:', error);
      return res.status(400).json({ 
        message: '用户ID格式不正确',
        receivedUserId: userId
      });
    }
    

    // 检查是否已经提交过
    const existingSubmission = await AmbiguityAttiSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(200).json({ 
        message: '您已经提交过评估，无法重复提交',
        alreadySubmitted: true,
        previousScore: existingSubmission.ambiguityAttitude,
        submittedAt: existingSubmission.submittedAt
      });
    }

    // 创建新的提交
    const surveySubmission = new AmbiguityAttiSurvey({
      userId: userObjectId,
      ambiguityAttitude,
      submittedAt: new Date()
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '提交成功！',
      submittedAt: surveySubmission.submittedAt,
      ambiguityAttitude: surveySubmission.ambiguityAttitude
    });

  } catch (error) {
    console.error('提交错误:', error);
    res.status(500).json({ 
      message: '提交失败，请重试',
      error: error.message 
    });
  }
});

export default router;