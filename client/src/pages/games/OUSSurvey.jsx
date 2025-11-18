import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ousSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';

const OUSSurvey = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  // 加载问题列表
  useEffect(() => {
    ousSurveyAPI.getQuestions()
      .then(response => {
        setQuestions(response.data.questions);
        // 初始化答案数组
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

    // 检查是否所有问题都已回答
    if (answers.some(answer => answer === 0)) {
      toast.error('请回答所有问题');
      return;
    }

    setLoading(true);
    
    const formattedAnswers = answers.map((score, index) => ({
      questionNumber: index + 1,
      score: score
    }));

    ousSurveyAPI.submit({
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>牛津功利主义量表调查</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={question.questionNumber} style={{ marginBottom: '20px' }}>
              <p>{question.questionNumber}. {question.questionText}</p>
              <div>
                {[1, 2, 3, 4, 5, 6, 7].map(score => (
                  <label key={score} style={{ marginRight: '15px' }}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={score}
                      checked={answers[index] === score}
                      onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                      disabled={loading}
                    />
                    {score}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '提交中...' : '提交'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OUSSurvey;