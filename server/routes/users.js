import express from 'express';
import UserModel from '../models/Users.js';
import bcrypt from 'bcryptjs';

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



export default router; 