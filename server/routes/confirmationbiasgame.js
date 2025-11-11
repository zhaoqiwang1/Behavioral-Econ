import express from 'express';
import UserModel from '../models/Users.js';
import ConfirmationBiasGameSurvey from '../models/ConfirmationBiasGame.js';
import mongoose from 'mongoose';


const router = express.Router();

// #region Post，提交 confirmation bias game 答案
router.post('/submit', async (req, res) => {
  try {
    const { 
      userId, 
      stanceTech, 
      stanceEcon, 
      confirmBiasTech, 
      confirmBiasEcon, 
      evalBiasTechSupport, 
      evalBiasTechOppose, 
      evalBiasEconSupport, 
      evalBiasEconOppose 
    } = req.body;
    
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
    const existingSubmission = await ConfirmationBiasGameSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经提交过游戏答案，无法重复提交',
        alreadySubmitted: true,
        submittedAt: existingSubmission.submittedAt
      });
    }

    // 创建新的提交
    const gameSubmission = new ConfirmationBiasGameSurvey({
      userId: userObjectId,
      stanceTech,
      stanceEcon,
      confirmBiasTech,
      confirmBiasEcon,
      evalBiasTechSupport,
      evalBiasTechOppose,
      evalBiasEconSupport,
      evalBiasEconOppose,
      submittedAt: new Date()
    });

    await gameSubmission.save();

    res.status(201).json({
      message: '游戏答案提交成功！',
      submittedAt: gameSubmission.submittedAt
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