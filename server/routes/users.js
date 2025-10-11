import express from 'express';
import UserModel from '../models/Users.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const router = express.Router();

// #region 注册路由
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, studentid, age, gender, education } = req.body;
    // console.log('接收到的req.body:', req.body);
    // console.log('解构后的 studentid:', studentid);
    
    // 检查用户是否已存在
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已被注册' });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }

    // 加密密码
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 创建用户（包含 demographic 信息）
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      demographic: {
        studentid,
        age: parseInt(age), // 确保年龄是数字
        gender,
        education
      },
      createdAt: new Date()
    });

    await newUser.save();

    res.status(201).json({
      message: "注册成功",
    });

  } catch (error) {
    console.error("注册错误:", error);
    res.status(500).json({ message: "服务器错误" });
  }
});
// #endregion

// #region 登录路由
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 输入验证
    if (!username || !password) {
      return res.status(400).json({ message: "用户名和密码不能为空" });
    }

    // 1. 查找用户
    const user = await UserModel.findOne({ username });
    if (!user) {
      console.log(`用户不存在: ${username}`);
      return res.status(401).json({ message: "用户名或密码错误" }); // 模糊提示，避免信息泄露
    }

    // 2. 使用bcrypt验证密码（推荐）
    // 首先确保用户注册时密码是加密存储的
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`密码错误，用户: ${username}`);
      return res.status(401).json({ message: "用户名或密码错误" });
    }

    // 安全的返回用户信息
    const userResponse = {
      _id: user._id,
      username: user.username,
      token: "user-token-" + user._id, // 简单token，后续可改为JWT
      loginTime: new Date().toISOString()
    };

    // console.log(`用户登录成功: ${username}`);

    res.json({
      message: "登录成功",
      user: userResponse,
      token: "这里是JWT token" 
    });

  } catch (error) {
    console.error("登录接口错误详情:", error);
    res.status(500).json({ 
      message: "服务器内部错误",
      error: process.env.NODE_ENV === 'development' ? error.message : '请联系管理员'
    });
  }
});
// #endregion

// #region 获取用户信息路由
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 验证用户ID格式
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(400).json({ message: '用户ID格式不正确' });
    }

    // 查找用户，排除密码字段
    const user = await UserModel.findById(userObjectId).select('-password');
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 安全的返回用户信息
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      demographic: user.demographic,
      createdAt: user.createdAt
    };

    res.status(200).json({
      message: "获取用户信息成功",
      user: userResponse
    });

  } catch (error) {
    console.error("获取用户信息错误:", error);
    res.status(500).json({ 
      message: "服务器错误",
      error: process.env.NODE_ENV === 'development' ? error.message : '请联系管理员'
    });
  }
});
// #endregion

// #region 更新用户信息路由
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, studentid, age, gender, education } = req.body;

    // 验证用户ID格式
    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(400).json({ message: '用户ID格式不正确' });
    }

    // 检查用户是否存在
    const user = await UserModel.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 检查用户名是否被其他用户使用（如果修改了用户名）
    if (username && username !== user.username) {
      const existingUser = await UserModel.findOne({ 
        username, 
        _id: { $ne: userObjectId } // 排除当前用户
      });
      if (existingUser) {
        return res.status(400).json({ message: '用户名已被其他用户使用' });
      }
    }

    // 检查邮箱是否被其他用户使用（如果修改了邮箱）
    if (email && email !== user.email) {
      const existingEmail = await UserModel.findOne({ 
        email, 
        _id: { $ne: userObjectId } // 排除当前用户
      });
      if (existingEmail) {
        return res.status(400).json({ message: '邮箱已被其他用户使用' });
      }
    }

    // 构建更新数据
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // 更新 demographic 信息
    if (studentid !== undefined || age !== undefined || gender !== undefined || education !== undefined) {
      updateData.demographic = {
        ...user.demographic, // 保留原有数据
        ...(studentid !== undefined && { studentid }),
        ...(age !== undefined && { age: parseInt(age) }),
        ...(gender !== undefined && { gender }),
        ...(education !== undefined && { education })
      };
    }

    // 执行更新
    const updatedUser = await UserModel.findByIdAndUpdate(
      userObjectId,
      updateData,
      { new: true } // 返回更新后的文档
    );

    // 安全的返回用户信息（不包含密码）
    const userResponse = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      demographic: updatedUser.demographic,
      createdAt: updatedUser.createdAt
    };

    res.status(200).json({
      message: "用户信息更新成功",
      user: userResponse
    });

  } catch (error) {
    console.error("更新用户信息错误:", error);
    res.status(500).json({ 
      message: "服务器错误",
      error: process.env.NODE_ENV === 'development' ? error.message : '请联系管理员'
    });
  }
});
// #endregion

export default router; 