// This is the HomePage for the whole Website.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';  // 新增导入
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar
import styles from './HomePage.module.css';  

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

  // #region 不同游戏的onClick设置
  // 专门用于公共物品游戏的函数
  const handlePublicGoodsGame = () => {
    checkAuthAndNavigate(
      '/public-goods',
      '你需要先登录哦'
    );
  };

    // 专门用于风险评估的函数
  const handleRiskAttiGame = () => {
    checkAuthAndNavigate(
      '/risk-attitude-elicit',
      '你需要先登录哦'
    );
  };

  // 专门用于模糊偏好评估的函数
  const handleAmbiguityAttiGame = () => {
    checkAuthAndNavigate(
      '/ambiguity-attitude-elicit',
      '你需要先登录哦'
    );
  };

  // 专门用于过度自信的函数
  const handleOverconfidenceGame = () => {
    checkAuthAndNavigate(
      '/overconfidence-game',
      '你需要先登录哦'
    );
  };

  // 专门用于game under ambiguity 的函数
  const handleGameUnderAmbig = () => {
    checkAuthAndNavigate(
      '/game-under-ambiguity',
      '你需要先登录哦'
    );
  };
  // #endregion

  // 新增：如果还在检查登录状态，显示加载中
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className={styles.homepageContainer}>
      <Navbar />

      <div className={styles.homepageContent}>
        <h1>HomePage</h1>
        <p>以下是我们的游戏列表</p>
        
        {/* 新的游戏按钮网格容器 */}
        <div className={styles.gameGrid}>
          <button 
            className={styles.assessmentBtn}
            onClick={handlePublicGoodsGame}
            style={{
              backgroundImage: "url('../assets/images/public_goods_game.jpg')"
            }}
          >
            公共物品
          </button>

          <button 
            className={styles.assessmentBtn}
            onClick={handleRiskAttiGame}
            style={{
              backgroundImage: "url('../assets/images/risk_assessment.jpg')"
            }}
          >
            风险评估
          </button>
          
          <button 
            className={styles.assessmentBtn}
            onClick={handleAmbiguityAttiGame}
            style={{
              backgroundImage: "url('../assets/images/ambiguity_assessment.jpg')"
            }}
          >
            模糊偏好
          </button>
          
          {/* 这里可以继续添加更多按钮，它们会自动排列 */}
          <button 
            className={styles.assessmentBtn}
            onClick={handleOverconfidenceGame}
            style={{
              backgroundImage: "url('../assets/images/overconfidence_assessment.jpg')"
            }}
          >
            过度自信
          </button>
          
          <button 
            className={styles.assessmentBtn}
            onClick={handleGameUnderAmbig}
            style={{
              backgroundImage: "url('../assets/images/game_under_ambiguity.jpg')"
            }}
          >
            Game Under Ambiguity
          </button>
                    <button 
            className={styles.assessmentBtn}
            style={{
              backgroundImage: "url('../assets/images/game6.jpg')"
            }}
          >
           TBD
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;