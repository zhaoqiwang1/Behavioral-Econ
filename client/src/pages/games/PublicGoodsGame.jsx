import React, { useState } from "react";
import { publicGoodsAPI } from '../../services/api.js'; 
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './PublicGoodsGame.module.css'; 
import Navbar from '../../components/Navbar.jsx';  

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
      // alert('用户信息错误，请重新登录');
      toast.error('用户信息错误，请重新登录');
      return;
    }

    if (!userContribution || userContribution < 0 || userContribution > 20) {
      // alert('请输入0-20之间的有效金额');
      toast.error('请输入0-20之间的有效金额');
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
        
        // 检查是否完成了所有回合
        if (response.data.isCompleted) {
          // alert('恭喜！您已完成所有20个回合！');
          toast.success('恭喜！您已完成所有20个回合！');
          setHasSubmitted(true);
        } else {
          // 进入下一轮
          // alert('回答成功，请回答下一回合。');
          toast.success('回答成功，请回答下一回合。');
          setCurrentRound(currentRound + 1);
        }
      }
    })
    .catch((error) => {
      const { response } = error;
  
      if (response?.status === 409) {
        if (response.data.alreadyCompleted) {
          // 已经完成所有回合
          // alert('你已经完成所有20个回合，不能重复参与');
          toast.error('你已经完成所有20个回合，不能重复参与');
          setHasSubmitted(true);
        } else {
          // 当前回合已提交
          alert(response.data.message);
          // 进入下一回合
          if (currentRound < totalRounds) {
            setCurrentRound(currentRound + 1);
            setUserContribution("");
          } else {
            setHasSubmitted(true);
          }
        }
      } else {
        // 其他错误
        console.error('提交失败:', error);
        // alert(response?.data?.message || '提交失败，请重试');
        toast.error(response?.data?.message || '提交失败，请重试');
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
          <p>你已经成功完成所有{totalRounds}个回合！感谢你的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>游戏说明</h1>
        <div className={styles.instructions}>
          <h3>假设你和另外几个人一起，向某项目做投入</h3>
          <ul>
            <li>我将在课后为同学们随机分配小组，4人一组。</li>
            <li>每位同学做多个回合的决策。</li>
            <li>每次决策都是独立的决策，相互不影响。</li>
            <li>每次决策的时候，每位同学都会获得20分的得分。</li>
            <li>每次决策的时候，每位同学需要决定自己投入多少分。</li>
            <li>你的每一回合的报酬由下面的公式决定。</li>
            <p>报酬<sub>i</sub> = 20 - 投入<sub>i</sub> + 0.4 × ∑ 投入<sub>j</sub></p>
            <li>例1：你投入了15分，其他三人一共投入5分，你这回合的报酬 = 20 - 15 + 0.4 × 5 = 7分;</li>
            <li>例2：你投入了3分，其他三人一共投入30分，这回合你的报酬 = 20 - 3 + 0.4 × 30 = 29分;</li>
            <li>我们一共做大概20个回合。</li>
            <li>我将在课后随机挑选一个回合，你在本次实验中的得分是随机挑选的这个回合里的得分。</li>
          </ul>
        </div>
      <div className={styles.gameContainer}>
        <p>当前进度：第 {currentRound} / {totalRounds} 回合</p>
        <div className={styles.inputSection}>
          <label>贡献到此项目的分数数量：</label>
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