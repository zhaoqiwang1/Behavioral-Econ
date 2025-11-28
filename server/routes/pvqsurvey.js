import express from 'express';
import PVQSurvey from '../models/PVQ.js';
import mongoose from 'mongoose';

const router = express.Router();

// 预定义的40个问题
const QUESTIONS = [
  { questionNumber: 1, questionText: "想出新点子和具有创造力对 TA 很重要。TA 喜欢以自己独特的方式做事。" },
  { questionNumber: 2, questionText: "变得富有对 TA 很重要。TA 想拥有很多钱和昂贵的东西。" },
  { questionNumber: 3, questionText: "TA 认为让世界上所有人都被平等对待很重要。TA 相信每个人都应拥有平等的生活机会。" },
  { questionNumber: 4, questionText: "展现自己的能力对 TA 非常重要。TA 希望别人欣赏 TA 所做的事。" },
  { questionNumber: 5, questionText: "生活在安全的环境中对 TA 很重要。TA 避免任何可能危及自身安全的事物。" },
  { questionNumber: 6, questionText: "做生活中各种不同的事情对 TA 很重要。TA 总是在寻找新鲜事物去尝试。" },
  { questionNumber: 7, questionText: "TA 认为人应该听从指示。TA 觉得即使没有人监督，也应该始终遵守规则。" },
  { questionNumber: 8, questionText: "倾听与自己不同的人对 TA 很重要。即使不同意，TA 仍希望理解他们。" },
  { questionNumber: 9, questionText: "TA 认为不要贪求超过自己已有的东西很重要。TA 相信人应该满足于已有的一切。" },
  { questionNumber: 10, questionText: "TA 会抓住任何机会享受乐趣。做让自己快乐的事情对 TA 很重要。" },
  { questionNumber: 11, questionText: "做决定时，TA 喜欢自己作主。TA 希望拥有规划及选择活动的自由。" },
  { questionNumber: 12, questionText: "帮助身边的人对 TA 非常重要。TA 希望关心他人的幸福。" },
  { questionNumber: 13, questionText: "成功对 TA 很重要。TA 喜欢给别人留下深刻印象。" },
  { questionNumber: 14, questionText: "保持国家安全对 TA 非常重要。TA 认为国家必须警惕内外部的威胁。" },
  { questionNumber: 15, questionText: "TA 喜欢冒险，总是在寻找新的刺激。" },
  { questionNumber: 16, questionText: "行为得体对 TA 很重要。TA 希望避免做任何被认为是错误的事。" },
  { questionNumber: 17, questionText: "掌控他人、下达指令对 TA 很重要。TA 希望别人按照 TA 的要求去做。" },
  { questionNumber: 18, questionText: "对朋友忠诚对 TA 很重要。TA 愿意全心投入亲近的人。" },
  { questionNumber: 19, questionText: "TA 坚信人类应该关爱大自然。" },
  { questionNumber: 20, questionText: "宗教信仰对 TA 很重要。TA 努力遵守宗教的要求。" },
  { questionNumber: 21, questionText: "保持整洁、有条理对 TA 很重要。TA 非常不喜欢杂乱无章。" },
  { questionNumber: 22, questionText: "对事物保持好奇心对 TA 很重要。TA 喜欢尝试理解各种不同的事物。" },
  { questionNumber: 23, questionText: "TA 相信世界所有人的生活应该和谐。促进各群体之间的和平对 TA 很重要。" },
  { questionNumber: 24, questionText: "有抱负对 TA 很重要。TA 想展现自己的能力。" },
  { questionNumber: 25, questionText: "TA 认为以传统方式做事最好。保持所学到的习俗对 TA 很重要。" },
  { questionNumber: 26, questionText: "享受生活的乐趣对 TA 很重要。TA 喜欢犒劳自己。" },
  { questionNumber: 27, questionText: "回应他人的需要对 TA 很重要。TA 努力支持自己认识的人。" },
  { questionNumber: 28, questionText: "TA 认为应始终尊重父母和长者。服从对 TA 来说很重要。" },
  { questionNumber: 29, questionText: "TA 希望所有人都被公正对待，即使是陌生人。保护社会弱势群体对 TA 很重要。" },
  { questionNumber: 30, questionText: "TA 喜欢惊喜。拥有刺激的生活对 TA 很重要。" },
  { questionNumber: 31, questionText: "TA 努力避免生病。保持健康对 TA 非常重要。" },
  { questionNumber: 32, questionText: "人生中出人头地对 TA 很重要。TA 努力比别人做得更好。" },
  { questionNumber: 33, questionText: "宽恕曾伤害过 TA 的人对 TA 很重要。TA 尝试看到他们的优点，而不是怀恨在心。" },
  { questionNumber: 34, questionText: "独立对 TA 很重要。TA 喜欢依靠自己。" },
  { questionNumber: 35, questionText: "稳定的政府对 TA 很重要。TA 担心社会秩序被破坏。" },
  { questionNumber: 36, questionText: "对他人礼貌对 TA 很重要。TA 尽量不打扰或惹恼别人。" },
  { questionNumber: 37, questionText: "享受生活对 TA 非常重要。过得开心对 TA 来说很重要。" },
  { questionNumber: 38, questionText: "谦逊、低调对 TA 很重要。TA 尽量不引起注意。" },
  { questionNumber: 39, questionText: "TA 总是希望自己是做决定的那个人。TA 喜欢当领导者。" },
  { questionNumber: 40, questionText: "顺应自然、融入自然对 TA 很重要。TA 相信人类不应改变自然。" }
];

// 获取调查问题
router.get('/questions', (req, res) => {
  res.json({
    questions: QUESTIONS
  });
});

// 提交肖像价值观问卷调查
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
    const existingSubmission = await PVQSurvey.findOne({ userId: userObjectId });
    if (existingSubmission) {
      return res.status(409).json({ 
        message: '您已经完成过这个调查，不能重复参与'
      });
    }

    // 验证答案数量
    if (!answers || !Array.isArray(answers) || answers.length !== 40) {
      return res.status(400).json({ 
        message: '请完整回答所有40个问题'
      });
    }

    // 创建调查记录，包含问题文本
    const answersWithText = answers.map((answer, index) => ({
      questionNumber: index + 1,
      questionText: QUESTIONS[index].questionText,
      score: answer.score
    }));

    // 创建新的提交
    const surveySubmission = new PVQSurvey({
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