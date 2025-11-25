import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mfqSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';
import styles from './MFQSurvey.module.css';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx';

const MFQSurvey = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  // 第一部分 (1-16题) 的评分标签
  const SCORE_LABELS_PART1 = {
    0: "完全不相关",
    1: "不太相关", 
    2: "略微相关",
    3: "一定程度相关",
    4: "非常相关",
    5: "极度相关"
  };

  // 第二部分 (17-32题) 的评分标签
  const SCORE_LABELS_PART2 = {
    0: "强烈不同意",
    1: "中度不同意", 
    2: "轻微不同意",
    3: "轻微同意",
    4: "中度同意",
    5: "强烈同意"
  };

  // 根据问题序号获取对应的评分标签
  const getScoreLabels = (questionNumber) => {
    return questionNumber <= 16 ? SCORE_LABELS_PART1 : SCORE_LABELS_PART2;
  };

  // 加载问题列表
  useEffect(() => {
    mfqSurveyAPI.getQuestions()
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

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
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
    
    const formattedAnswers = answers.map((score, index) => ({
      questionNumber: index + 1,
      score: score
    }));

    mfqSurveyAPI.submit({
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
          <h2>✅ 调查已完成</h2>
          <p>你已经成功提交调查结果，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  if (questionsLoading) {
    return (
      <div>
        <Navbar />
        <div className={styles.loadingContainer}>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>请如实回答下面的问题</h1>
        <form onSubmit={handleSubmit}>
          {/* 第一部分标题 */}
          <div className={styles.sectionTitle}>
            <h2>第一部分</h2>
            <p>当你判断某件事是对是错时，以下各项考量对你的思考影响程度如何？</p>
            <p>请使用以下量表对每个陈述进行评分：</p>
            <ul>
              <li>完全不相关（该考量与我对是非的判断毫无关联）</li>
              <li>不太相关</li>
              <li>略微相关</li>
              <li>一定程度相关</li>
              <li>非常相关</li>
              <li>极度相关（这是我判断是非时最重要的因素之一）</li>
            </ul>
          </div>
          {questions.slice(0, 16).map((question, index) => {
            const scoreLabels = getScoreLabels(question.questionNumber);
            return (
              <div key={question.questionNumber} className={styles.question}>
                <p>{question.questionNumber}. {question.questionText}</p>
                <div className={styles.radioGroup}>
                  {[0, 1, 2, 3, 4, 5].map(score => (
                    <label key={score} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={score}
                        checked={answers[index] === score}
                        onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                        disabled={loading}
                      />
                      {scoreLabels[score]}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* 第二部分标题 */}
          <div className={styles.sectionTitle}>
            <h2>第二部分</h2>
            <p>请阅读以下内容，并表明你的同意或不同意程度。</p>
          </div>
          {questions.slice(16).map((question, index) => {
            const scoreLabels = getScoreLabels(question.questionNumber);
            const actualIndex = index + 16; // 保持正确的答案索引
            return (
              <div key={question.questionNumber} className={styles.question}>
                <p>{question.questionNumber}. {question.questionText}</p>
                <div className={styles.radioGroup}>
                  {[0, 1, 2, 3, 4, 5].map(score => (
                    <label key={score} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={`question-${actualIndex}`}
                        value={score}
                        checked={answers[actualIndex] === score}
                        onChange={(e) => handleAnswerChange(actualIndex, parseInt(e.target.value))}
                        disabled={loading}
                      />
                      {scoreLabels[score]}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? '提交中...' : '提交'}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default MFQSurvey;