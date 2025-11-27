import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { svoSurveyAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx';

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
        <div>
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
        <div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>社会价值取向调查</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
            <div key={question.questionNumber}>
              <p>{question.questionNumber}. {question.questionText}</p>
              <div>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={optionIndex}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                      disabled={loading}
                    />
                    自己: {option.selfAmount} | 他人: {option.otherAmount}
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

export default SVOSurvey;