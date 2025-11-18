// Oxford Utilitarianism Scale Survey
import express from 'express';
import OUSSurvey from '../models/OUS.js';
import mongoose from 'mongoose';

const router = express.Router();

// 预定义的9个问题
const QUESTIONS = [
  { questionNumber: 1, questionText: "从道德角度看，每个人的福祉应被同等重视。" },
  { questionNumber: 2, questionText: "如果伤害无辜者是帮助其他多名无辜者的必要手段，那么伤害无辜者在道德上是可以接受的。" },
  { questionNumber: 3, questionText: "在决定做什么时，我们应当始终同等地考虑所有人的福祉（即便是陌生人）。" },
  { questionNumber: 4, questionText: "当出于必要必须伤害一些人以实现更大利益时，这是道德上可以接受的。" },
  { questionNumber: 5, questionText: "我会支持一项能为更多人带来更大幸福的政策，即使该政策会伤害一个人。" },
  { questionNumber: 6, questionText: "有时，为了阻止对更多人的更大伤害，伤害某个人在道德上是合理的。" },
  { questionNumber: 7, questionText: "我致力于不偏不倚地促进每个人的福祉。" },
  { questionNumber: 8, questionText: "有时为了更大的总体利益，以伤害个体作为手段是可接受的。" },
  { questionNumber: 9, questionText: "当牺牲少数人的利益可以最大化整体福祉时，我认为这种牺牲是合理的。" }
];

// 获取调查问题
router.get('/questions', (req, res) => {
  res.json({
    questions: QUESTIONS
  });
});

// 提交牛津功利主义量表调查
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
    const existingSubmission = await OUSSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个调查，不能重复参与'
      });
    }

    // 简化验证：只检查是否有9个答案
    if (!answers || !Array.isArray(answers) || answers.length !== 9) {
      return res.status(400).json({ 
        message: '请完整回答所有9个问题'
      });
    }

    // 创建调查记录，包含问题文本
    const answersWithText = answers.map((answer, index) => ({
      questionNumber: index + 1,
      questionText: QUESTIONS[index].questionText,
      score: answer.score
    }));

    // 创建新的提交
    const surveySubmission = new OUSSurvey({
      userId: userObjectId,
      answers: answersWithText
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