import express from 'express';
import RiskAttiSurvey from '../models/RiskAtti.js';

const router = express.Router();

// 提交风险评估答案
router.post('/submit', async (req, res) => {
  try {
    const { userId, riskScore } = req.body;
    
    // 验证必填字段
    if (!userId || !riskScore) {
      return res.status(400).json({ 
        message: '缺少必要字段: userId, riskScore' 
      });
    }

    // 检查用户是否已经提交过
    const existingSubmission = await RiskAttiSurvey.findOne({ userId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '你已经回答过这个问题，无法重复提交' 
      });
    }

    // 创建新的提交
    const surveySubmission = new RiskAttiSurvey({
      userId,
      riskScore
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '风险评估提交成功！',
      submittedAt: surveySubmission.submittedAt
    });

  } catch (error) {
    console.error('提交风险评估错误:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: '您已经提交过风险评估，无法重复提交' 
      });
    }
    
    res.status(500).json({ 
      message: '提交失败，请重试',
      error: error.message 
    });
  }
});

// 检查用户是否已经提交过（前端用来决定是否显示表单）
router.get('/check-submission/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const existingSubmission = await RiskAttiSurvey.findOne({ userId });
    
    res.status(200).json({
      hasSubmitted: !!existingSubmission
    });

  } catch (error) {
    console.error('检查提交状态错误:', error);
    res.status(500).json({ 
      message: '检查提交状态失败',
      error: error.message 
    });
  }
});

export default router;

