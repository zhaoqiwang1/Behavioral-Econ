import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { svoSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx';
import styles from './SVOSurvey.module.css'; // 引入 CSS Module

const SVOSurvey = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  // 加载问题列表
  useEffect(() => {
    svoSurveyAPI.getQuestions()
      .then(response => {
        setQuestions(response.data.questions);
        // 初始化答案数组，用null表示未选择
        setAnswers(Array(response.data.questions.length).fill(null));
      })
      .catch(error => {
        console.error('获取问题失败:', error);
        toast.error('获取调查问题失败，请刷新页面重试');
      })
      .finally(() => {
        setQuestionsLoading(false);
      });
  }, []);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error('用户信息错误，请重新登录');
      return;
    }

    // 检查是否所有问题都已回答
    if (answers.some(answer => answer === null)) {
      toast.error('请回答所有问题');
      return;
    }

    setLoading(true);
    
    const formattedAnswers = answers.map((selectedOption, index) => ({
      questionNumber: index + 1,
      selectedOption: selectedOption
    }));

    svoSurveyAPI.submit({
      userId: user._id,
      answers: formattedAnswers
    })
    .then((response) => {
      if (response.status === 201) {
        toast.success('提交成功！感谢您的参与。');
        setHasSubmitted(true);
      }
    })
    .catch((error) => {
      const { response } = error;
      if (response?.status === 409) {
        toast.error('你已经提交过相关回答，无法重复提交。');
        setHasSubmitted(true);
      } else {
        console.error('提交失败:', error);
        toast.error(`${response?.data?.message || '提交失败，请重试'}`);
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.completedContainer}>
          <h2 className={styles.completedTitle}>✅ 调查已完成</h2>
          <p className={styles.completedDesc}>你已经成功提交调查结果，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  if (questionsLoading) {
    return (
      <div>
        <Navbar />
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.instructionBox}>
          <h1 className={styles.title}>请如实回答下面的问题</h1>
          <ul>
            <li>在本游戏中，系统会随机将你与另一位同学配对。</li>
            <li>你将通过 6 组（选项1 到 选项6）分配方案，逐一决定自己与对方在每组中的实验得分。</li>
            <li>每组方案均提供 9 种可选的得分组合，请选出你最偏好的那一个。</li>
            <li>每组方案的 9 种得分组合中，横轴上方（下方）的数字对应的是你自己的（另一个同学）的收益。</li>
            <li>实验结束后，我们将随机抽取其中 1 组方案，并按照你当时的选择，为你和配对同学结算真实的实验得分。</li>
            <li>你的每一个选择都有可能成为最终兑现的方案，请认真考虑。</li>
          </ul> 
        </div>
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
            <div key={question.questionNumber} className={styles.questionCard}>
              <p className={styles.questionNumber}>
                {/* {question.questionNumber}.  */}
                {question.questionText}
              </p>
                {/* 新增：横轴上方的左右标签 */}
              <div className={styles.axisLabelContainer}>
                <span className={styles.axisLabel}>自我收益</span>
                <span className={styles.axisLabel}>自我收益</span>
              </div>
              <div className={styles.optionAxis}>
                <div className={styles.axisLine}></div>
                {question.options.map((option, optionIndex) => (
                  // 关键：用 div 包裹，确保点击事件不冒泡，label 仅负责关联 radio
                  <div key={optionIndex} className={styles.optionPoint}>
                    <label className={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        // 关键：用 === 严格判断，避免类型问题
                        checked={answers[questionIndex] === optionIndex}
                        // 强制触发状态更新
                        onChange={(e) => {
                          e.stopPropagation(); // 阻止冒泡
                          handleAnswerChange(questionIndex, optionIndex);
                        }}
                        disabled={loading}
                        className={styles.optionInput}
                      />
                      <span className={styles.selfScore}>{option.selfAmount}</span>
                      <span className={styles.pointIndicator}></span>
                      <span className={styles.otherScore}>{option.otherAmount}</span>
                    </label>
                  </div>
                ))}
              </div>
                {/* 新增：横轴下方标签（和上方完全一致） */}
              <div className={styles.axisLabelContainer}>
                <span className={styles.axisLabel} style={{ color: '#2d3748' }}>他人收益</span>
                <span className={styles.axisLabel} style={{ color: '#2d3748' }}>他人收益</span>
              </div>
            </div>
          ))}
          <div className={styles.submitContainer}>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '提交中...' : '提交'}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SVOSurvey;