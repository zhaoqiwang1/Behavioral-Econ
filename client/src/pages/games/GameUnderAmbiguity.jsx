import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { gameUnderAmbiguityAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './GameUnderAmbiguity.module.css';
import Navbar from '../../components/Navbar.jsx';

const GameUnderAmbiguity = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(Array(8).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [tempSelections, setTempSelections] = useState(Array(8).fill(null)); // 临时选择

  const roundDetails = [
    { round: 1, optionA: { self: 6.6, other: 5.8 }, optionB: { self: 10, other: 2, probability: "50%的概率" } },
    { round: 2, optionA: { self: 5, other: 3.3 }, optionB: { self: 7.5, other: 2, probability: "未知概率" } },
    { round: 3, optionA: { self: 6.6, other: 5 }, optionB: { self: 7.5, other: 3.3, probability: "50%的概率" } },
    { round: 4, optionA: { self: 3.3, other: 2.5 }, optionB: { self: 5, other: 2, probability: "50%的概率" } },
    { round: 5, optionA: { self: 6.6, other: 5 }, optionB: { self: 7.5, other: 3.3, probability: "未知概率" } },
    { round: 6, optionA: { self: 5, other: 3.3 }, optionB: { self: 7.5, other: 2, probability: "50%的概率" } },
    { round: 7, optionA: { self: 3.3, other: 2.5 }, optionB: { self: 5, other: 2, probability: "未知概率" } },
    { round: 8, optionA: { self: 6.6, other: 5.8 }, optionB: { self: 10, other: 2, probability: "未知概率" } }
  ];

  // 处理临时选择变化
  const handleTempChoiceChange = (roundIndex, choice) => {
    const newTempSelections = [...tempSelections];
    newTempSelections[roundIndex] = choice;
    setTempSelections(newTempSelections);
  };

  // 确认当前回合的选择
  const handleConfirmChoice = (roundIndex) => {
    if (tempSelections[roundIndex]) {
      const newAnswers = [...answers];
      newAnswers[roundIndex] = tempSelections[roundIndex];
      setAnswers(newAnswers);
      
      // 清空临时选择
      const newTempSelections = [...tempSelections];
      newTempSelections[roundIndex] = null;
      setTempSelections(newTempSelections);
      
      // 自动进入下一回合
      if (roundIndex < roundDetails.length - 1) {
        setCurrentRound(roundIndex + 1);
      }
    }
  };

  const validateAnswers = () => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === null) {
        // alert(`请完成第 ${i + 1} 回合的选择`);
        toast.error(`请完成第 ${i + 1} 回合的选择`);
        setCurrentRound(i);
        return false;
      }
    }
    return true;
  };

  const goToRound = (roundIndex) => {
    setCurrentRound(roundIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      // alert('用户信息错误，请重新登录');
      toast.error('用户信息错误，请重新登录');
      return;
    }

    if (!validateAnswers()) {
      return;
    }

    setIsSubmitting(true);

    const formattedAnswers = answers.map((choice, index) => ({
      roundNumber: index + 1,
      choice: choice
    }));

    const submitData = {
      userId: user._id,
      answers: formattedAnswers
    };

    gameUnderAmbiguityAPI.submit(submitData)
      .then((response) => {
        if (response.status === 201) {
          // alert('提交成功！感谢您的参与。');
          toast.success('提交成功！感谢您的参与。');
          setHasSubmitted(true);
        }
      })
      .catch((error) => {
        const { response } = error;
        if (response?.status === 409) {
          // alert('您已经完成过这个实验，不能重复参与');
          toast.error('你已经完成过这个实验，不能重复参与。');
          setHasSubmitted(true);
        } else {
          console.error('提交失败:', error);
          // alert(`${response?.data?.message || '提交失败，请重试'}`);
          toast.error(`${response?.data?.message || '提交失败，请重试'}`);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // const handleReset = () => {
  //   setAnswers(Array(8).fill(null));
  //   setTempSelections(Array(8).fill(null));
  //   setCurrentRound(0);
  // };

  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.completedMessage}>
            <h2>感谢参与！</h2>
            <p>你已经完成过模糊性游戏实验，无法重复参与。</p>
            <button className={styles.backButton} onClick={() => window.history.back()}>
              返回
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>课堂实验 - 模糊性游戏</h1>
          <p>这门课一共100分满分，按照教学大纲的计划，我们拿出其中10分来做实验。</p>
        </div>

        <div className={styles.instructions}>
          <h2>实验规则</h2>
          <div className={styles.ruleSection}>
            <h3>基本规则</h3>
            <ul>
              <li>今天，我们一共玩8个回合的游戏。</li>
              <li>每个回合大家都需要在下面的A,B中选择一个作为自己的决策。</li>
              <li>我们有两个角色，一个是"决策者"，另一个是"接受者"。</li>
              <li>每一回合，我都会随机把大家两两配对。每一对里面，有一位同学会被随机选择作为"决策者"，另一位同学就作为"接受者"。</li>
              <li>两位同学在每一回合的得分由"决策者"决定，"接受者"只能接受"决策者"所做出的决定。</li>
            </ul>
          </div>

          <div className={styles.ruleSection}>
            <h3>角色分配</h3>
            <ul>
              <li>在每一回合中，谁是"决策者"，谁是"接受者"是随机决定的，每一位同学都有50%的概率做"决策者"。</li>
              <li>因此大家都需要在每一个回合做决定。</li>
              <li>因为你不知道另一位同学是"决策者"还是"接受者"，因此你不需要在意TA所做的决定，请大家认真思考自己需要做哪个决策。</li>
            </ul>
          </div>

          <div className={styles.ruleSection}>
            <h3>概率说明</h3>
            <ul>
              <li>有一半的回合在B选项中，另一位同学的得分概率是已知的 — 50%。</li>
              <li>另一半回合里的B选项中，另一位同学的得分概率是未知的 — 未知。</li>
              <li>对于后一种情况，未知概率是0%到100%之间的随机数，我会在[0,100]里随机抽取一个数作为那一个回合的概率。但是大家在做决策的时候是不知道的。</li>
              <li>你不知道哪一回合在B选项中是已知概率，哪一回合是未知概率；两者的顺序是随机的。</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.roundsSection}>
            <h2>请完成以下8个回合的决策</h2>
            <p>在每个回合中，请选择您偏好的选项（A 或 B）</p>
            
            <div className={styles.legend}>
              <div><strong>选项A:</strong> 您得 X 分，另一位同学得 Y 分</div>
              <div><strong>选项B:</strong> 您得 X 分，另一位同学有 P 概率得 0 分，有 (1-P) 概率得 Y 分</div>
            </div>

            <div className={styles.roundsNavigation}>
              {roundDetails.map((round, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.navButton} ${
                    index === currentRound ? styles.active : ''
                  } ${answers[index] ? styles.completed : ''}`}
                  onClick={() => goToRound(index)}
                  disabled={index > 0 && !answers[index - 1] && index !== currentRound}
                >
                  {index + 1}
                  {answers[index] && <span className={styles.checkmark}>✓</span>}
                </button>
              ))}
            </div>

            <div className={styles.currentRound}>
              {roundDetails.slice(0, currentRound + 1).map((round, index) => (
                <div 
                  key={index} 
                  className={`${styles.roundCard} ${index === currentRound ? styles.active : ''}`}
                >
                  <div className={styles.roundHeader}>
                    <h3>第 {round.round} 回合</h3>
                    {index < currentRound && <span className={styles.completedBadge}>已完成</span>}
                  </div>
                  
                  <div className={styles.choices}>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${
                        tempSelections[index] === 'A' ? styles.selectedTemp : ''} ${
                        answers[index] === 'A' ? styles.selectedConfirmed : ''}`
                      }
                      onClick={() => handleTempChoiceChange(index, 'A')}
                      disabled={isSubmitting || answers[index] !== null}
                    >
                      <div className={styles.choiceContent}>
                        <span className={styles.choiceLabel}>选项 A</span>
                        <div className={styles.payoffDetails}>
                          <div>你得 <strong>{round.optionA.self}</strong> 分;</div>
                          <div>另一位同学得 <strong>{round.optionA.other}</strong> 分</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${
                        tempSelections[index] === 'B' ? styles.selectedTemp : ''} ${
                        answers[index] === 'B' ? styles.selectedConfirmed : ''}`
                      }
                      onClick={() => handleTempChoiceChange(index, 'B')}
                      disabled={isSubmitting || answers[index] !== null}
                    >
                      <div className={styles.choiceContent}>
                        <span className={styles.choiceLabel}>选项 B</span>
                        <div className={styles.payoffDetails}>
                          <div>你得 <strong>{round.optionB.self}</strong> 分；</div>
                          <div>另一位同学有{round.optionB.probability}得 <strong>{round.optionB.other}</strong> 分</div>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <div className={styles.choiceIndicator}>
                    {answers[index] ? (
                      <div className={styles.confirmedChoice}>
                        <span>已确认选择: <strong>{answers[index]}</strong></span>
                      </div>
                    ) : tempSelections[index] ? (
                      <div className={styles.tempChoice}>
                        <span>临时选择: <strong>{tempSelections[index]}</strong></span>
                        <button 
                          type="button" 
                          className={styles.confirmButton}
                          onClick={() => handleConfirmChoice(index)}
                        >
                          确认选择
                        </button>
                      </div>
                    ) : (
                      <span className={styles.notSelected}>请选择你的决策</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${((currentRound + 1) / roundDetails.length) * 100}%` }}
                ></div>
              </div>
              <div className={styles.progressText}>
                已完成 {answers.filter(answer => answer !== null).length} / {roundDetails.length} 回合
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {/* <button type="button" onClick={handleReset} className={styles.resetButton} disabled={isSubmitting}>
              重置所有选择
            </button> */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting || answers.filter(answer => answer !== null).length < roundDetails.length}>
              {isSubmitting ? '提交中...' : '提交答案'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameUnderAmbiguity;