import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ousSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';

const OUSSurvey = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(Array(9).fill(0));
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = [
    "从道德角度看，每个人的福祉应被同等重视。",
    "如果伤害无辜者是帮助其他多名无辜者的必要手段，那么伤害无辜者在道德上是可以接受的。",
    "在决定做什么时，我们应当始终同等地考虑所有人的福祉（即便是陌生人）。",
    "当出于必要必须伤害一些人以实现更大利益时，这是道德上可以接受的。",
    "我会支持一项能为更多人带来更大幸福的政策，即使该政策会伤害一个人。",
    "有时，为了阻止对更多人的更大伤害，伤害某个人在道德上是合理的。",
    "我致力于不偏不倚地促进每个人的福祉。",
    "有时为了更大的总体利益，以伤害个体作为手段是可接受的。",
    "当牺牲少数人的利益可以最大化整体福祉时，我认为这种牺牲是合理的。"
  ];

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

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>牛津功利主义量表调查</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <p>{index + 1}. {question}</p>
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