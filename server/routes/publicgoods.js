import express from 'express';
import PublicGoods from '../models/PublicGoods.js';
import mongoose from 'mongoose';

const router = express.Router();

// 提交公共物品游戏单个回合数据
router.post('/submit', async (req, res) => {
  try {
    const { userId, round, contribution } = req.body;
  
    // 转换 userId 为 ObjectId
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(400).json({ 
        message: '用户ID格式不正确'
      });
    }

    // 验证必要字段
    if (!userId || !round || contribution === undefined) {
      return res.status(400).json({ 
        message: '缺少必要字段' 
      });
    }

    // 验证回合范围
    if (round < 1 || round > 20) {
      return res.status(400).json({ 
        message: '回合数必须在1-20之间' 
      });
    }

    // 验证贡献值范围
    if (contribution < 0 || contribution > 20) {
      return res.status(400).json({ 
        message: '贡献值必须在0-20之间' 
      });
    }

    // 查找用户记录
    const existingRecord = await PublicGoods.findOne({ userId: userObjectId });
    
    // 检查用户是否已经完成所有回合
    if (existingRecord && existingRecord.answers.length >= 20) {
      return res.status(409).json({ 
        message: '您已经完成所有20个回合，不能重复参与',
        alreadyCompleted: true
      });
    }

    // 检查是否已经提交过该回合
    if (existingRecord) {
      const existingRound = existingRecord.answers.find(
        answer => answer.round === round
      );
      if (existingRound) {
        return res.status(409).json({ 
          message: `您已经提交过第${round}回合的数据`
        });
      }
    }

    // 使用 findOneAndUpdate 来添加新的回合答案
    const result = await PublicGoods.findOneAndUpdate(
      { userId: userObjectId },
      { 
        $push: { 
          answers: {
            round: round,
            contribution: contribution,
            submittedAt: new Date()
          }
        }
      },
      { 
        upsert: true, // 如果不存在则创建新文档
        new: true, // 返回更新后的文档
        runValidators: true // 运行 Schema 验证
      }
    );

    // 检查是否完成了所有回合
    const completedRounds = result.answers.length;
    const isCompleted = completedRounds >= 20;

    res.status(201).json({
      message: `第${round}回合提交成功！`,
      isCompleted: isCompleted
    });

  } catch (error) {
    console.error('公共物品游戏提交错误:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: '该回合数据已存在'
      });
    }
    
    res.status(500).json({ 
      message: '提交失败，请重试'
    });
  }
});

export default router;