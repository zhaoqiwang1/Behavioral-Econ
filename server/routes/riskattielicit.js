import express from 'express';
import UserModel from '../models/Users.js';
import RiskAttiSurvey from '../models/RiskAtti.js';
import mongoose from 'mongoose';

const router = express.Router();

// #region Post，提交风险评估答案
router.post('/submit', async (req, res) => {
  try {
    const { userId, riskAttitude } = req.body;
    
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
    const existingSubmission = await RiskAttiSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经提交过评估，无法重复提交',
        alreadySubmitted: true,
        previousScore: existingSubmission.riskAttitude,
        submittedAt: existingSubmission.submittedAt
      });
    }

    // 创建新的提交
    const surveySubmission = new RiskAttiSurvey({
      userId: userObjectId,
      riskAttitude,
      submittedAt: new Date()
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '提交成功！',
      submittedAt: surveySubmission.submittedAt,
      riskAttitude: surveySubmission.riskAttitude
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


// #region Get风险评估的答案
router.get('/results', async (req, res) => {
  try {
    // 使用聚合查询来连接 RiskAttiSurvey 和 User 集合
    const riskData = await RiskAttiSurvey.aggregate([
      {
        $lookup: {
          from: 'users', // User 集合的名称
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo' // 将用户信息数组展开为对象
      },
      {
        $project: {
          _id: 0,
          studentName: '$userInfo.username', // 使用 username 字段
          studentId: '$userInfo.demographic.studentid', // 使用 demographic.studentid
          riskAttitude: 1,
          submittedAt: 1
        }
      },
      {
        $sort: { submittedAt: -1 } // 按提交时间倒序排列
      }
    ]);

    res.status(200).json({
      success: true,
      data: riskData,
      count: riskData.length
    });

  } catch (error) {
    console.error('获取风险偏好数据错误:', error);
    res.status(500).json({ 
      success: false,
      message: '获取数据失败，请重试',
      error: error.message 
    });
  }
});
// #endregion


export default router;