// routes/gameUnderAmbiguity.js
import express from 'express';
import UserModel from '../models/Users.js';
import GameUnderAmbiguity from '../models/GameUnderAmbiguity.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   POST /api/game-under-ambiguity/submit
// @desc    提交模糊性游戏的8个回合答案
// @access  Private
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    
    // console.log('收到的 userId:', userId);
    // console.log('收到的 answers:', answers);
  
    // 转换 userId 为 ObjectId
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
      // console.log('转换后的 userObjectId:', userObjectId);
    } catch (error) {
      console.error('ObjectId 转换错误:', error);
      return res.status(400).json({ 
        message: '用户ID格式不正确',
        receivedUserId: userId
      });
    }

    // 检查是否已经提交过
    const existingSubmission = await GameUnderAmbiguity.findOne({ 
      userId: userObjectId 
    });
    
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个实验，不能重复参与',
        alreadySubmitted: true
      });
    }

    // 验证输入
    if (!answers || !Array.isArray(answers) || answers.length !== 8) {
      return res.status(400).json({ 
        message: '请完整回答所有8个回合'
      });
    }
    
    // 检查答案格式和回合编号
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      
      // 检查必需字段
      if (!answer.roundNumber || !answer.choice) {
        return res.status(400).json({ 
          message: `第${i + 1}个回合的答案格式不正确` 
        });
      }
      
      // 检查回合编号是否匹配
      if (answer.roundNumber !== i + 1) {
        return res.status(400).json({ 
          message: `回合编号不匹配` 
        });
      }
      
      // 检查选择是否有效
      if (!['A', 'B'].includes(answer.choice)) {
        return res.status(400).json({ 
          message: `第${i + 1}个回合：选择必须是A或B` 
        });
      }
    }

    // 创建实验记录
    const gameSubmission = new GameUnderAmbiguity({
      userId: userObjectId,
      answers: answers
    });

    await gameSubmission.save();

    res.status(201).json({
      message: '感谢您的参与！实验答案已提交成功。'
    });

  } catch (error) {
    console.error('提交错误:', error);
    
    // 处理唯一性约束错误
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: '您已经完成过这个实验，不能重复参与',
        alreadySubmitted: true
      });
    }
    
    res.status(500).json({ 
      message: '提交失败，请重试',
      error: error.message 
    });
  }
});

export default router;