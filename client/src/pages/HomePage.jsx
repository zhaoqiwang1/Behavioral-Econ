// This is the HomePage for the whole Website.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';  // 新增导入
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar
import './HomePage.css';  

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
    <div className="homepage-container">
      <Navbar />

      <div className="homepage-content">
        <h1>HomePage</h1>
        <p>以下是我们的游戏列表</p>
        
        {/* 新的游戏按钮网格容器 */}
        <div className="game-grid">
          <button 
            className="assessment-btn"
            onClick={handleRiskAttiGame}
            style={{
              backgroundImage: "url('../assets/images/risk-assessment.jpg')"
            }}
          >
            风险评估
          </button>
          
          <button 
            className="assessment-btn"
            style={{
              backgroundImage: "url('../assets/images/ambiguity-assessment.jpg')"
            }}
          >
            模糊偏好
          </button>
          
          {/* 这里可以继续添加更多按钮，它们会自动排列 */}
          <button 
            className="assessment-btn"
            style={{
              backgroundImage: "url('../assets/images/game3.jpg')"
            }}
          >
            游戏3
          </button>
          
          <button 
            className="assessment-btn"
            style={{
              backgroundImage: "url('../assets/images/game4.jpg')"
            }}
          >
            游戏4
          </button>
          
          <button 
            className="assessment-btn"
            style={{
              backgroundImage: "url('../assets/images/game5.jpg')"
            }}
          >
            游戏5
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
