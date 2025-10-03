// This is the HomePage for the whole Website.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';  // 新增导入
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar


const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();  // 新增这行

  // 通用的权限检查函数
  const checkAuthAndNavigate = (path, message) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      alert(message);
    }
  };

    // 专门用于风险评估的函数
  const handleRiskAttiGame = () => {
    checkAuthAndNavigate(
      '/risk-attitude-elicit',
      '你需要先登录哦'
    );
  };


  // 新增：如果还在检查登录状态，显示加载中
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Navbar />

      <h1>HomePage</h1>
      <p>主页主要展示一些行为经济，金融，心理学等等相关的内容。用以吸引用户。</p>
      <p>用户有兴趣，需要玩具体的游戏了，就注册并登录。</p>
      <button 
        onClick={handleRiskAttiGame}
      >
        开始风险评估
      </button>
    </div>
  );
}

export default HomePage;
