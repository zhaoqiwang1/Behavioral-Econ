import express from 'express';
import UserModel from '../models/Users.js';
import MBTISurvey from '../models/MBTI.js';
import mongoose from 'mongoose';

const router = express.Router();


// #region Post，提交MBTI测试结果
router.post('/submit', async (req, res) => {
  try {
    const { userId, mbtiAnswers } = req.body;
    
    console.log('收到的 userId:', userId);
  
    // #region 转换 userId 为 ObjectId
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
    // #endregion

    // 检查是否已经提交过
    const existingSubmission = await MBTISurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经提交过测试，无法重复提交',
        alreadySubmitted: true,
        previousResult: existingSubmission.mbtiAnswers,
        submittedAt: existingSubmission.submittedAt
      });
    }

    // 创建新的提交
    const surveySubmission = new MBTISurvey({
      userId: userObjectId,
      mbtiAnswers,
      submittedAt: new Date()
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '提交成功！',
      submittedAt: surveySubmission.submittedAt,
      mbtiAnswers: surveySubmission.mbtiAnswers
    });

  } catch (error) {
    console.error('提交错误:', error);
    res.status(500).json({ 
      message: '提交失败，请重试',
      error: error.message 
    });
  }
});
// #endregion

export default router;