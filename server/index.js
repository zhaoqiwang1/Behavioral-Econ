import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// #region 导入路由
import usersRoutes from './routes/users.js';
import riskAttiRoutes from './routes/riskattielicit.js';
import ambiguityAttiRoutes from './routes/ambiguityattielicit.js';
import publicGoodsRoutes from './routes/publicgoods.js';
import overconfidenceGameRoutes from './routes/overconfidencegame.js';
import GameUnderAmbigRoutes from './routes/gameunderambiguity.js';
import MbtiElicitRoutes from './routes/mbtielicit.js';
// #endregion

const app = express();

app.use(express.json()); // this helps parse json into an object.
app.use(cors());

// mongoose.connect(
//   "mongodb+srv://zwang:Extra02sulfide@cluster0.dx6owno.mongodb.net/MERN_Tutorial_20250929"
// );

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB连接成功"))
  .catch(err => console.error("MongoDB连接失败：", err));

// #region 路由配置
app.use('/api/users', usersRoutes); 
    // 上面的代码在基础路由http://localhost:3001的基础上，这里加了对应的路由前缀，得到http://localhost:3001/api/users/. 等调用了后端routes/users.js里面的具体路由后，得到完整的api接口路由路径： http://localhost:3001/api/users/register
app.use('/api/riskatti', riskAttiRoutes); 
app.use('/api/ambiguityatti', ambiguityAttiRoutes);
app.use('/api/publicgoods', publicGoodsRoutes);
app.use('/api/overconfidencegame', overconfidenceGameRoutes);
app.use('/api/gameunderambiguity', GameUnderAmbigRoutes);
app.use('/api/mbtielicit', MbtiElicitRoutes);
// #endregion


// app.listen(3001, () => {
//   console.log("server runs perfectly.")
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server runs on port ${PORT}`);  // 输出端口，方便确认
});

