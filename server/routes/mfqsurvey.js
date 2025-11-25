// Moral Foundations Questionnaire Survey
import express from 'express';
import MFQSurvey from '../models/MFQ.js';
import mongoose from 'mongoose';

const router = express.Router();

// 预定义的32个问题
const QUESTIONS = [
  { questionNumber: 1, questionText: "某人是否在情感上受到了伤害" },
  { questionNumber: 2, questionText: "某些人是否受到了与他人不同的对待" },
  { questionNumber: 3, questionText: "某人的行为是否体现了对国家的热爱" },
  { questionNumber: 4, questionText: "某人是否表现出对权威的不尊重" },
  { questionNumber: 5, questionText: "某人是否违反了纯洁与得体的标准" },
  { questionNumber: 6, questionText: "某人是否擅长数学" },
  { questionNumber: 7, questionText: "某人是否照顾了弱小或易受伤害的人" },
  { questionNumber: 8, questionText: "某人是否行为不公" },
  { questionNumber: 9, questionText: "某人是否做出了背叛自己群体的事" },
  { questionNumber: 10, questionText: "某人是否遵守了社会传统" },
  { questionNumber: 11, questionText: "某人是否做出了令人反感的事" },
  { questionNumber: 12, questionText: "某人是否表现得残忍" },
  { questionNumber: 13, questionText: "某人是否被剥夺了权利" },
  { questionNumber: 14, questionText: "某人是否表现出缺乏忠诚" },
  { questionNumber: 15, questionText: "某一行为是否引发了混乱或无序" },
  { questionNumber: 16, questionText: "某人的行为方式是否会得到上帝的认可" },
  { questionNumber: 17, questionText: "对受苦者的同情是最重要的美德。" },
  { questionNumber: 18, questionText: "政府制定法律时，首要原则应是确保每个人都得到公平对待。" },
  { questionNumber: 19, questionText: "我为自己国家的历史感到自豪。" },
  { questionNumber: 20, questionText: "尊重权威是所有孩子都需要学习的事。" },
  { questionNumber: 21, questionText: "即使不会伤害到任何人，人们也不该做令人反感的事。" },
  { questionNumber: 22, questionText: "行善比作恶更好。" },
  { questionNumber: 23, questionText: "一个人能做的最糟糕的事之一，就是伤害毫无防御能力的动物。" },
  { questionNumber: 24, questionText: "公正是一个社会最重要的必备条件。" },
  { questionNumber: 25, questionText: "即使家人做错了事，人们也应该对他们忠诚。" },
  { questionNumber: 26, questionText: "男性和女性在社会中各自扮演着不同的角色。" },
  { questionNumber: 27, questionText: "我会因为某些行为违背自然规律，就认为它们是错误的。" },
  { questionNumber: 28, questionText: "杀害人类永远不可能是正确的。" },
  { questionNumber: 29, questionText: "我认为富有的孩子继承大量财产而贫穷的孩子一无所有，这在道德上是错误的。" },
  { questionNumber: 30, questionText: "做一个团队合作者比表达自我更重要。" },
  { questionNumber: 31, questionText: "如果我是士兵，即使不同意指挥官的命令，我也会服从，因为这是我的职责。" },
  { questionNumber: 32, questionText: "贞洁是一种重要且宝贵的美德。" }
];


// 获取调查问题
router.get('/questions', (req, res) => {
  res.json({
    questions: QUESTIONS
  });
});


// 提交道德基础问卷调查
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
    const existingSubmission = await MFQSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个调查，不能重复参与'
      });
    }

    // 验证：检查是否有32个答案
    if (!answers || !Array.isArray(answers) || answers.length !== 32) {
      return res.status(400).json({ 
        message: '请完整回答所有32个问题'
      });
    }

    // 创建调查记录，包含问题文本
    const answersWithText = answers.map((answer, index) => ({
      questionNumber: index + 1,
      questionText: QUESTIONS[index].questionText,
      score: answer.score
    }));

    // 创建新的提交
    const surveySubmission = new MFQSurvey({
      userId: userObjectId,
      answers: answersWithText
    });

    await surveySubmission.save();

    res.status(201).json({
      message: '感谢您的参与！问卷调查已提交成功。'
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