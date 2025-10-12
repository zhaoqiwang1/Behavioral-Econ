import express from 'express';
import UserModel from '../models/Users.js';
import OverconfidenceGame from '../models/OverconfidenceGame.js';
import mongoose from 'mongoose';

const router = express.Router();

// 预定义的10个问题
const QUESTIONS = [
  { questionNumber: 1, questionText: "太阳的寿命(单位:十亿年)" },
  { questionNumber: 2, questionText: "全世界的陆地面积(单位:千平方公里)" },
  { questionNumber: 3, questionText: "联合国成员国（即会员国）的数目（单位：个）" },
  { questionNumber: 4, questionText: "人体肌肉的总数（单位：块）" },
  { questionNumber: 5, questionText: "2012年中国人口老龄化率(以百分比表示)" },
  { questionNumber: 6, questionText: "牛顿发现万有引力的年份（具体的年份时间）" },
  { questionNumber: 7, questionText: "2010年中国回族人口（单位：千人）" },
  { questionNumber: 8, questionText: "东方明珠塔高度(单位:米)" },
  { questionNumber: 9, questionText: "中国南北跨度(单位:公里)" },
  { questionNumber: 10, questionText: "大西洋的深度(单位:米)" }
];

// 提交过度自信游戏答案
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    
    console.log('收到的 userId:', userId);
    console.log('收到的 answers:', answers);
  
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
    const existingSubmission = await OverconfidenceGame.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个游戏，不能重复参与',
        alreadySubmitted: true
      });
    }

    // 验证输入
    if (!answers || !Array.isArray(answers) || answers.length !== 10) {
      return res.status(400).json({ 
        message: '请完整回答所有10个问题'
      });
    }
    
    // 检查答案格式和问题编号
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      
      // 检查必需字段
      if (!answer.questionNumber || answer.lowerBound === undefined || answer.upperBound === undefined) {
        return res.status(400).json({ 
          message: `第${i + 1}个问题的答案格式不正确` 
        });
      }
      
      // 检查问题编号是否匹配
      if (answer.questionNumber !== i + 1) {
        return res.status(400).json({ 
          message: `问题编号不匹配` 
        });
      }
      
      // 检查下限是否小于上限
      if (answer.lowerBound >= answer.upperBound) {
        return res.status(400).json({ 
          message: `第${i + 1}个问题：最低值必须小于最高值` 
        });
      }
    }

    // 创建游戏记录，包含问题文本
    const answersWithText = answers.map((answer, index) => ({
      ...answer,
      questionText: QUESTIONS[index].questionText
    }));

    // 创建新的提交
    const gameSubmission = new OverconfidenceGame({
      userId: userObjectId,
      answers: answersWithText
    });

    await gameSubmission.save();

    res.status(201).json({
      message: '感谢您的参与！答案已提交成功。'
    });

  } catch (error) {
    console.error('提交错误:', error);
    
    // 处理唯一性约束错误
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: '您已经完成过这个游戏，不能重复参与',
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