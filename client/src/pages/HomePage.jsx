// This is the HomePage for the whole Website.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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
     // alert(message);
      toast.error(message);
    }
  };

  // #region 不同游戏的onClick设置
  // 专门用于公共物品游戏的函数
  const handlePublicGoodsGame = () => {
    checkAuthAndNavigate(
      '/games/public-goods',
      '你需要先登录哦'
    );
  };

    // 专门用于风险评估的函数
  const handleRiskAttiGame = () => {
    checkAuthAndNavigate(
      '/games/risk-attitude-elicit',
      '你需要先登录哦'
    );
  };

  // 专门用于模糊偏好评估的函数
  const handleAmbiguityAttiGame = () => {
    checkAuthAndNavigate(
      '/games/ambiguity-attitude-elicit',
      '你需要先登录哦'
    );
  };

  // 专门用于过度自信的函数
  const handleOverconfidenceGame = () => {
    checkAuthAndNavigate(
      '/games/overconfidence-game',
      '你需要先登录哦'
    );
  };

  // 专门用于game under ambiguity 的函数
  const handleGameUnderAmbig = () => {
    checkAuthAndNavigate(
      '/games/game-under-ambiguity',
      '你需要先登录哦'
    );
  };

  // 专门用于 MBTI Elicit 的函数
  const handleMBTIElicit = () => {
    checkAuthAndNavigate(
      '/games/mbti-elicit-game',
      '你需要先登录哦'
    );
  };

  // #endregion

  // #region 展示行为数据
    // 展示风险偏好函数
  const handleShowRiskAtti = () => {
    checkAuthAndNavigate(
      '/gameresults/show-risk-attitudes',
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
        <h1 className={styles.mainTitle}>行为科学实验平台</h1>
        <p className={styles.subtitle}>参与实验，探索行为科学奥秘</p>
        
        {/* 游戏区域 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>实验游戏</h2>
          <p className={styles.sectionDescription}>点击下方按钮开始参与不同的行为科学实验</p>
          
          <div className={styles.gameGrid}>
            <button 
              className={styles.gameBtn}
              onClick={handlePublicGoodsGame}
              style={{
                backgroundImage: "url('../assets/images/public_goods_game.jpg')"
              }}
            >
              <span>公共物品游戏</span>
            </button>

            <button 
              className={styles.gameBtn}
              onClick={handleRiskAttiGame}
              style={{
                backgroundImage: "url('../assets/images/risk_assessment.jpg')"
              }}
            >
              <span>风险评估游戏</span>
            </button>
            
            <button 
              className={styles.gameBtn}
              onClick={handleAmbiguityAttiGame}
              style={{
                backgroundImage: "url('../assets/images/ambiguity_assessment.jpg')"
              }}
            >
              <span>模糊偏好评估</span>
            </button>
            
            <button 
              className={styles.gameBtn}
              onClick={handleOverconfidenceGame}
              style={{
                backgroundImage: "url('../assets/images/overconfidence_assessment.jpg')"
              }}
            >
              <span>过度自信实验</span>
            </button>
            
            <button 
              className={styles.gameBtn}
              onClick={handleGameUnderAmbig}
              style={{
                backgroundImage: "url('../assets/images/game_under_ambiguity.jpg')"
              }}
            >
              {/* <span>模糊情境博弈</span> */}
            </button>

            <button 
              className={styles.gameBtn}
              onClick={handleMBTIElicit}
              style={{
                backgroundImage: "url('../assets/images/mbti_game.jpg')"
              }}
            >
              <span>MBTI</span>
            </button>

            <button 
              className={`${styles.resultBtn} ${styles.comingSoon}`}
              onClick={() => toast.error('功能开发中...')}
            >
              <span>更多游戏</span>
              <div className={styles.resultBadge}>即将开放</div>
            </button>
          </div>
        </section>

        {/* 结果统计区域 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>实验结果查看</h2>
          <p className={styles.sectionDescription}>查看和分析已完成的实验数据结果</p>
          
          <div className={styles.resultsGrid}>
            <button 
              className={styles.resultBtn}
              onClick={handleShowRiskAtti}
              style={{
                backgroundImage: "url('../assets/images/risk_assessment.jpg')"
              }}
            >
              <span>风险偏好分析</span>
              <div className={styles.resultBadge}>数据可视化</div>
            </button>
            
            {/* 可以继续添加更多结果分析按钮 */}
            <button 
              className={`${styles.resultBtn} ${styles.comingSoon}`}
              onClick={() => toast.error('功能开发中...')}
            >
              <span>更多分析</span>
              <div className={styles.resultBadge}>即将开放</div>
            </button>

            <button 
              className={`${styles.resultBtn} ${styles.comingSoon}`}
              onClick={() => toast.error('功能开发中...')}
            >
              <span>更多分析</span>
              <div className={styles.resultBadge}>即将开放</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;