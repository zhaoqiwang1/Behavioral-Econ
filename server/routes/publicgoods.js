import express from 'express';
import UserModel from '../models/Users.js';
import PublicGoods from '../models/PublicGoods.js';
import mongoose from 'mongoose';

const router = express.Router();

// 提交公共物品游戏数据
router.post('/submit', async (req, res) => {
  try {
    const { userId, round, contribution } = req.body;
  
    // 转换 userId 为 ObjectId
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      console.error('ObjectId 转换错误:', error);
      return res.status(400).json({ 
        message: '用户ID格式不正确',
        receivedUserId: userId
      });
    }

    // 验证必要字段
    if (!userId || !round || contribution === undefined) {
      return res.status(400).json({ 
        message: '缺少必要字段' 
      });
    }

    // 验证贡献值范围
    if (contribution < 0 || contribution > 20) {
      return res.status(400).json({ 
        message: '贡献值必须在0-20之间' 
      });
    }


    // 检查是否已经提交过该回合
    const existingSubmission = await PublicGoods.findOne({ 
      userId: userObjectId, 
      round: round 
    });

    if (existingSubmission) {
      return res.status(409).json({ 
        message: `您已经提交过第${round}回合的数据`
      });
    }

    // 创建新的提交记录
    const gameSubmission = new PublicGoods({
      userId: userObjectId,
      round: round,
      contribution: contribution,
      submittedAt: new Date()
    });

    await gameSubmission.save();

    res.status(201).json({
      message: `第${round}回合提交成功！`
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