import React, { useState } from "react";
import { publicGoodsAPI } from '../services/api'; 
import { useAuth } from '../contexts/AuthContext';
import styles from './PublicGoodsGame.module.css'; 
import Navbar from '../components/Navbar.jsx';  

const PublicGoodsGame = () => {
  const { user } = useAuth();
  const [currentRound, setCurrentRound] = useState(1);
  const [userContribution, setUserContribution] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalRounds = 20;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert('用户信息错误，请重新登录');
      return;
    }

    if (!userContribution || userContribution < 0 || userContribution > 20) {
      alert('请输入0-20之间的有效金额');
      return;
    }

    setLoading(true);
    
    const submitData = {
      userId: user._id,
      round: currentRound,
      contribution: parseInt(userContribution)
    };

    publicGoodsAPI.submit(submitData)
    .then((response) => {
      if (response.status === 201) {
        // 清空当前输入
        setUserContribution("");
        
        // 如果是最后一轮，显示完成页面
        if (currentRound === totalRounds) {
          alert('恭喜！您已完成所有20个回合！');
          setHasSubmitted(true);
        } else {
          // 进入下一轮
          alert('回答成功，请回答下一回合。');
          setCurrentRound(currentRound + 1);
        }
      }
    })
    .catch((error) => {
     const { response } = error;
  
     if (response?.status === 409) {
        // 专门处理重复提交的情况
        console.warn('重复提交被阻止:', response.data?.message || '已完成所有回合');
        alert('你已经完成所有回合的提交，无法重复提交数据！');
        setHasSubmitted(true);
      } else {
      // 其他错误使用通用处理
      console.error('提交失败:', error);
      alert(response?.data?.message || '提交失败，请重试');
  }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleContributionChange = (value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setUserContribution("");
    } else if (numValue >= 0 && numValue <= 20) {
      setUserContribution(numValue.toString());
    }
  };

  // 如果已经提交过所有回合，显示完成页面
  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.completedInfo}>
          <h2>✅ 公共物品游戏已完成</h2>
          <p>您已经成功完成所有{totalRounds}个回合！感谢您的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>公共物品游戏</h1>
      
      <div className={styles.instructions}>
        <h3>游戏说明</h3>
        <p>您有100个代币可以分配。请选择您想要贡献到公共池的代币数量（0-100）。</p>
        <p>当前进度：第 {currentRound} / {totalRounds} 回合</p>
      </div>

      <div className={styles.gameContainer}>
        <div className={styles.inputSection}>
          <label>贡献到公共池的代币数量：</label>
          <input
            type="number"
            min="0"
            max="20"
            value={userContribution}
            onChange={(e) => handleContributionChange(e.target.value)}
            placeholder="输入 0-20 之间的数字"
            className={styles.contributionInput}
          />
        </div>

        <div className={styles.submitSection}>
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={loading || !userContribution}
          >
            {loading ? '提交中...' : `提交第 ${currentRound} 回合`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicGoodsGame;