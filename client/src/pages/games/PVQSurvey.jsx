import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { pvqSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx';
import styles from './PVQSurvey.module.css';

const PVQSurvey = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  const SCORE_LABELS = {
    1: "完全不像我",
    2: "不像我", 
    3: "有点像我",
    4: "有些像我",
    5: "像我",
    6: "非常像我"
  };

  // 加载问题列表
  useEffect(() => {
    pvqSurveyAPI.getQuestions()
      .then(response => {
        setQuestions(response.data.questions);
        setAnswers(Array(response.data.questions.length).fill(0));
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

    if (answers.some(answer => answer === 0)) {
      toast.error('请回答所有问题');
      return;
    }

    setLoading(true);
    
    const formattedAnswers = answers.map((score, index) => ({
      questionNumber: index + 1,
      score: score
    }));

    pvqSurveyAPI.submit({
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
        <div className={styles.sectionTitle}>
          <h1>请如实回答下面几个问题</h1>
          <ul>
            <li>请如实、准确作答。请记住：这些题目没有对错之分，都是主观判断。</li>
            <li>每题请根据“你现在一般来说的感觉”来回答，而不是过去或未来可能的感觉。</li>
            <li>每题有 6 个选项：</li>
            <li>(1) 完全不像我；(2) 不像我；(3) 有点像我；(4) 有些像我；(5) 像我；(6) 非常像我。</li>
            <li>以下将描述一些人物。请阅读后判断“TA”与“你自己”有多相似，并勾选相应的选项。</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question.questionNumber} className={styles.question}>
              <p>{question.questionNumber}. {question.questionText}</p>
              <div className={styles.radioGroup}>
                {[1, 2, 3, 4, 5, 6].map(score => (
                  <label key={score} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={score}
                      checked={answers[index] === score}
                      onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                      disabled={loading}
                    />
                    {SCORE_LABELS[score]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? '提交中...' : '提交'}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default PVQSurvey;