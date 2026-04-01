import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

// #region 导入路由
import usersRoutes from './routes/users.js';
import riskAttiRoutes from './routes/riskattielicit.js';
import ambiguityAttiRoutes from './routes/ambiguityattielicit.js';
import publicGoodsRoutes from './routes/publicgoods.js';
import overconfidenceGameRoutes from './routes/overconfidencegame.js';
import GameUnderAmbigRoutes from './routes/gameunderambiguity.js';
import MbtiElicitRoutes from './routes/mbtielicit.js';
import confirmationBiasGameRoutes from './routes/confirmationbiasgame.js';
import ousSurveyRoutes from './routes/oussurvey.js';
import mfqSurveyRoutes from './routes/mfqsurvey.js';
import svoSurveyRoutes from './routes/svosurvey.js';
import pvqSurveyRoutes from './routes/pvqsurvey.js';
// #endregion

const app = express();

// 处理 ES 模块下的 __dirname 问题（必须保留）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// MongoDB 连接（修正变量名，你之前写错了 MONGODB_URI）
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB连接成功 ✅"))
  .catch(err => console.error("MongoDB连接失败 ❌：", err));

// #region 路由配置
app.use('/api/users', usersRoutes);
app.use('/api/riskatti', riskAttiRoutes);
app.use('/api/ambiguityatti', ambiguityAttiRoutes);
app.use('/api/publicgoods', publicGoodsRoutes);
app.use('/api/overconfidencegame', overconfidenceGameRoutes);
app.use('/api/gameunderambiguity', GameUnderAmbigRoutes);
app.use('/api/mbtielicit', MbtiElicitRoutes);
app.use('/api/confirmationbiasgame', confirmationBiasGameRoutes);
app.use('/api/oussurvey', ousSurveyRoutes);
app.use('/api/mfqsurvey', mfqSurveyRoutes);
app.use('/api/svosurvey', svoSurveyRoutes);
app.use('/api/pvqsurvey', pvqSurveyRoutes);
// #endregion

// ==========================================
// 修复通配符路由问题：改用中间件兜底，替代 app.get('*')
// ==========================================
// 1. 托管前端静态资源（确保路径正确：../client/build 是 MERN 标准结构）
app.use(express.static(path.join(__dirname, "../client/build")));

// 2. 兜底中间件：所有未匹配的请求返回前端 index.html（解决通配符报错）
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器启动成功 ✅，运行在端口 ${PORT}`);
  console.log(`本地访问地址：http://localhost:${PORT}`);
});