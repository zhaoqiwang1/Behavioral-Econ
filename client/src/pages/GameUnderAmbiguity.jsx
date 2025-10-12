import React, { useState } from 'react';
import { gameUnderAmbiguityAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import styles from './GameUnderAmbiguity.module.css';
import Navbar from '../components/Navbar.jsx';

const GameUnderAmbiguity = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(Array(8).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // 处理选择变化
  const handleChoiceChange = (roundIndex, choice) => {
    const newAnswers = [...answers];
    newAnswers[roundIndex] = choice;
    setAnswers(newAnswers);
  };

  // 验证所有回合是否已选择
  const validateAnswers = () => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === null) {
        alert(`请完成第 ${i + 1} 回合的选择`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert('用户信息错误，请重新登录');
      return;
    }

    if (!validateAnswers()) {
      return;
    }

    setIsSubmitting(true);

    // 格式化答案数据
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
          alert('提交成功！感谢您的参与。');
          setHasSubmitted(true);
        }
      })
      .catch((error) => {
        const { response } = error;
        if (response?.status === 409) {
          alert('您已经完成过这个实验，不能重复参与');
          setHasSubmitted(true);
        } else {
          console.error('提交失败:', error);
          alert(`${response?.data?.message || '提交失败，请重试'}`);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // 重置表单
  const handleReset = () => {
    setAnswers(Array(8).fill(null));
  };

  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.completedMessage}>
            <h2>感谢参与！</h2>
            <p>您已经完成过模糊性游戏实验，无法重复参与。</p>
            <button 
              className={styles.backButton}
              onClick={() => window.history.back()}
            >
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

          <div className={styles.note}>
            <p><strong>注意：</strong>介于我们课堂实验有不方便的地方，难以做到实时随机分配。因此，每一回合的两两配对，以及每对里的两位同学的角色由老师课后按实到学生的身份和游戏规则随机决定。</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.roundsSection}>
            <h2>请完成以下8个回合的决策</h2>
            <p>在每个回合中，请选择您偏好的选项（A 或 B）</p>

            <div className={styles.roundsGrid}>
              {answers.map((choice, index) => (
                <div key={index} className={styles.roundCard}>
                  <div className={styles.roundHeader}>
                    <h3>第 {index + 1} 回合</h3>
                  </div>
                  
                  <div className={styles.choices}>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${choice === 'A' ? styles.selected : ''}`}
                      onClick={() => handleChoiceChange(index, 'A')}
                      disabled={isSubmitting}
                    >
                      <span className={styles.choiceLabel}>选项 A</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${choice === 'B' ? styles.selected : ''}`}
                      onClick={() => handleChoiceChange(index, 'B')}
                      disabled={isSubmitting}
                    >
                      <span className={styles.choiceLabel}>选项 B</span>
                    </button>
                  </div>
                  
                  <div className={styles.choiceIndicator}>
                    {choice && <span>已选择: <strong>{choice}</strong></span>}
                    {!choice && <span className={styles.notSelected}>尚未选择</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              disabled={isSubmitting}
            >
              重置所有选择
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '提交答案'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameUnderAmbiguity;