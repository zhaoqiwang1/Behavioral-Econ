// This is the HomePage for Behavioral Science Course.

import React from 'react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';  // 新增导入
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar
import styles from './BehavioralScienceHomePage.module.css';  

const BehavioralScienceHomePage = () => {
  useEffect(() => {
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();  // 新增这行
  const gameGridRef = useRef(null);
  const resultGridRef = useRef(null); // 新增

  // 通用的权限检查函数
  const checkAuthAndNavigate = (path, message) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
     // alert(message);
      toast.error(message);
    }
  };

  // #region 游戏区域左右滚动功能
  const scrollGameLeft = () => {
    if (gameGridRef.current) {
      gameGridRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollGameRight = () => {
    if (gameGridRef.current) {
      gameGridRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  // #endregion

  // #region 统计结果区域的滚动函数
  const scrollResultLeft = () => {
    if (resultGridRef.current) {
      resultGridRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollResultRight = () => {
    if (resultGridRef.current) {
      resultGridRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  // #endregion

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

  // 专门用于 Confirmation Bias Game 的函数
  const handleConfirmationBiasGame = () => {
    checkAuthAndNavigate(
      '/games/confirmation-bias-game',
      '你需要先登录哦'
    );
  };


  // 专门用于 OUS Survey 的函数
  const handleOUSSurvey = () => {
    checkAuthAndNavigate(
      '/games/ous-survey',
      '你需要先登录哦'
    );
  };


  // 专门用于 MFQ Survey 的函数
  const handleMFQSurvey = () => {
    checkAuthAndNavigate(
      '/games/mfq-survey',
      '你需要先登录哦'
    );
  };

  // 专门用于 SVO Survey 的函数
  const handleSVOSurvey = () => {
    checkAuthAndNavigate(
      '/games/svo-survey',
      '你需要先登录哦'
    );
  }
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
        <div className={styles.welcomeMessage}>
          <h1 className={styles.welcomeMessageTitle}>BEYOND ECONOMIC MAN</h1>
          <p className={styles.welcomeMessageDescription}>
            Challenge traditional assumptions and uncover the 
            <span id={styles.welcomeMessageHightlight}> cognitive biases </span>
            that shape real-world economic behavior.
          </p>
        </div>
        <div className={styles.gameSectionTitle}>
          <h1>行为科学实验</h1>
          <p>点击下方按钮参与不同的行为科学实验</p>
        </div>
        {/* 游戏区域 */}
        <section className={styles.gameSection}>
          <div className={styles.gameGridContainer}>
              <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollGameLeft}>
                ‹
              </button>
              <div className={styles.gameGrid} ref={gameGridRef}>
                {/* 你的按钮们 */}
                  <button 
                    className={styles.gameBtn}
                    onClick={handlePublicGoodsGame}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/public_goods_game.jpg')"
                    }}
                  >
                    <span>实验1</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleRiskAttiGame}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/risk_assessment.jpg')"
                    }}
                  >
                    <span>实验2</span>
                  </button>
                  
                  <button 
                    className={styles.gameBtn}
                    onClick={handleAmbiguityAttiGame}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/ambiguity_assessment.jpg')"
                    }}
                  >
                    <span>实验3</span>
                  </button>
                  
                  <button 
                    className={styles.gameBtn}
                    onClick={handleOverconfidenceGame}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/overconfidence_assessment.jpg')"
                    }}
                  >
                    <span>实验4</span>
                  </button>
                  
                  <button 
                    className={styles.gameBtn}
                    onClick={handleGameUnderAmbig}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/game_under_ambiguity.jpg')"
                    }}
                  >
                    <span>实验5</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleMBTIElicit}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/mbti_game.jpg')"
                    }}
                  >
                    <span>实验6</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleConfirmationBiasGame}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/confirmation_bias_game.jpg')"
                    }}
                  >
                    <span>实验7</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleOUSSurvey}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/ous_survey.jpg')"
                    }}
                  >
                    <span>实验8</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleMFQSurvey}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/mfq_survey.jpg')"
                    }}
                  >
                    <span>实验9</span>
                  </button>

                  <button 
                    className={styles.gameBtn}
                    onClick={handleSVOSurvey}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/svo_survey.jpg')"
                    }}
                  >
                    <span>实验10</span>
                  </button>
                  
                  <button 
                    className={`${styles.gameBtn} ${styles.comingSoon}`}
                    onClick={() => toast.error('功能开发中...')}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/pvq_survey.jpg')"
                    }}
                  >
                    <span>实验11</span>
                    <div className={styles.resultBadge}>即将开放</div>
                  </button>

                  <button 
                    className={`${styles.gameBtn} ${styles.comingSoon}`}
                    onClick={() => toast.error('功能开发中...')}
                    style={{
                      backgroundImage: "url('../assets/images/behavSciPage/question_dice.jpg')"
                    }}
                  >
                    <span>更多实验</span>
                    <div className={styles.resultBadge}>即将开放</div>
                  </button>
              </div>
              <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollGameRight}>
                ›
              </button>
          </div>  
        </section>

        {/* 结果统计区域 */}
        <section className={styles.resultSection}>
        </section>
          <div className={styles.resultSectionTitle}>
            <h1>统计结果</h1>
            <p>点击下方按钮查看不同游戏的统计结果</p>
          </div>
           <section className={styles.gameSection}>
              <div className={styles.gameGridContainer}>     
                  <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollResultLeft}>
                    ‹
                  </button>
                  <div className={styles.gameGrid} ref={resultGridRef}>
                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/public_goods_game.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验1
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/risk_assessment.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={handleShowRiskAtti}
                        >
                          实验2
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/ambiguity_assessment.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验3
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/overconfidence_assessment.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验4
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/game_under_ambiguity.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验5
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/mbti_game.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验6
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/confirmation_bias_game.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验7
                        </button>
                      </div>
                    
                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/ous_survey.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验8
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/mfq_survey.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验9
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/svo_survey.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验10
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/pvq_survey.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          实验11
                        </button>
                      </div>

                      <div className={styles.resultsItem}>
                        <img src="../assets/images/behavSciPage/more_analysis.jpg"   alt="Risk assessment visualization" />
                        <button 
                          className={styles.resultButton}
                          onClick={() => toast.error('功能开发中...')}
                        >
                          更多分析
                        </button>
                      </div>

                  </div>
                  <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollResultRight}>
                    ›
                  </button>
              </div>
           </section>
      </div>
    </div>
  );
}

export default BehavioralScienceHomePage;