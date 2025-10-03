import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

// #region 导入数据模型
import UserModel from './models/Users.js'; 
// #endregion



// #region 导入路由
import usersRoutes from './routes/users.js';
import riskAttiRoutes from './routes/riskattielicit.js';
// #endregion

const app = express();

app.use(express.json()); // this helps parse json into an object.
app.use(cors());

mongoose.connect(
  "mongodb+srv://zwang:Extra02sulfide@cluster0.dx6owno.mongodb.net/MERN_Tutorial_20250929"
);

// #region 路由配置
app.use('/api/users', usersRoutes); 
    // 上面的代码在基础路由http://localhost:3001的基础上，这里加了对应的路由前缀，得到http://localhost:3001/api/users/. 等调用了后端routes/users.js里面的具体路由后，得到完整的api接口路由路径： http://localhost:3001/api/users/register
app.use('/api/riskatti', riskAttiRoutes); 
// #endregion


app.listen(3001, () => {
  console.log("server runs perfectly.")
});





