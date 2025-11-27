// SVO Survey
import express from 'express';
import SVOSurvey from '../models/SVO.js';
import mongoose from 'mongoose';

const router = express.Router();

// 预定义的6个问题和对应的收益选项
const QUESTIONS = [
  {
    questionNumber: 1,
    questionText: "资源分配决策 1",
    options: [
      { selfAmount: 85, otherAmount: 85 },
      { selfAmount: 85, otherAmount: 76 },
      { selfAmount: 85, otherAmount: 68 },
      { selfAmount: 85, otherAmount: 59 },
      { selfAmount: 85, otherAmount: 50 },
      { selfAmount: 85, otherAmount: 41 },
      { selfAmount: 85, otherAmount: 33 },
      { selfAmount: 85, otherAmount: 24 },
      { selfAmount: 85, otherAmount: 15 }
    ]
  },
  {
    questionNumber: 2,
    questionText: "资源分配决策 2",
    options: [
      { selfAmount: 85, otherAmount: 15 },
      { selfAmount: 87, otherAmount: 19 },
      { selfAmount: 89, otherAmount: 24 },
      { selfAmount: 91, otherAmount: 28 },
      { selfAmount: 93, otherAmount: 33 },
      { selfAmount: 94, otherAmount: 37 },
      { selfAmount: 96, otherAmount: 41 },
      { selfAmount: 98, otherAmount: 46 },
      { selfAmount: 100, otherAmount: 50 }
    ]
  },
  {
    questionNumber: 3,
    questionText: "资源分配决策 3",
    options: [
      { selfAmount: 50, otherAmount: 100 },
      { selfAmount: 54, otherAmount: 98 },
      { selfAmount: 59, otherAmount: 96 },
      { selfAmount: 63, otherAmount: 94 },
      { selfAmount: 68, otherAmount: 93 },
      { selfAmount: 72, otherAmount: 91 },
      { selfAmount: 76, otherAmount: 89 },
      { selfAmount: 81, otherAmount: 87 },
      { selfAmount: 85, otherAmount: 85 }
    ]
  },
  {
    questionNumber: 4,
    questionText: "资源分配决策 4",
    options: [
      { selfAmount: 50, otherAmount: 100 },
      { selfAmount: 54, otherAmount: 89 },
      { selfAmount: 59, otherAmount: 79 },
      { selfAmount: 63, otherAmount: 68 },
      { selfAmount: 68, otherAmount: 58 },
      { selfAmount: 72, otherAmount: 47 },
      { selfAmount: 76, otherAmount: 36 },
      { selfAmount: 81, otherAmount: 26 },
      { selfAmount: 85, otherAmount: 15 }
    ]
  },
  {
    questionNumber: 5,
    questionText: "资源分配决策 5",
    options: [
      { selfAmount: 100, otherAmount: 50 },
      { selfAmount: 94, otherAmount: 56 },
      { selfAmount: 88, otherAmount: 63 },
      { selfAmount: 81, otherAmount: 69 },
      { selfAmount: 75, otherAmount: 75 },
      { selfAmount: 69, otherAmount: 81 },
      { selfAmount: 63, otherAmount: 88 },
      { selfAmount: 56, otherAmount: 94 },
      { selfAmount: 50, otherAmount: 100 }
    ]
  },
  {
    questionNumber: 6,
    questionText: "资源分配决策 6",
    options: [
      { selfAmount: 100, otherAmount: 50 },
      { selfAmount: 98, otherAmount: 54 },
      { selfAmount: 96, otherAmount: 59 },
      { selfAmount: 94, otherAmount: 63 },
      { selfAmount: 93, otherAmount: 68 },
      { selfAmount: 91, otherAmount: 72 },
      { selfAmount: 89, otherAmount: 76 },
      { selfAmount: 87, otherAmount: 81 },
      { selfAmount: 85, otherAmount: 85 }
    ]
  }
];

// 提交SVO问卷调查
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // 转换 userId 为 ObjectId
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(400).json({ 
        message: '用户ID格式不正确'
      });
    }

    // 检查是否已经提交过
    const existingSubmission = await SVOSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个调查，不能重复参与'
      });
    }

    // 验证：检查是否有6个答案
    if (!answers || !Array.isArray(answers) || answers.length !== 6) {
      return res.status(400).json({ 
        message: '请完整回答所有6个问题'
      });
    }

    // 创建调查记录，包含问题文本和对应的收益
    const answersWithDetails = answers.map((answer, index) => {
      const question = QUESTIONS[index];
      const selectedOption = question.options[answer.selectedOption];
      
      return {
        questionNumber: question.questionNumber,
        questionText: question.questionText,
        selectedOption: answer.selectedOption,
        selfAmount: selectedOption.selfAmount,
        otherAmount: selectedOption.otherAmount
      };
    });

    // 创建新的提交
    const surveySubmission = new SVOSurvey({
      userId: userObjectId,
      answers: answersWithDetails
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '感谢您的参与！调查已提交成功。'
    });

  } catch (error) {
    console.error('提交错误:', error);
    
    // 处理唯一性约束错误
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: '您已经完成过这个调查，不能重复参与'
      });
    }
    
    res.status(500).json({ 
      message: '提交失败，请重试'
    });
  }
});

export default router;