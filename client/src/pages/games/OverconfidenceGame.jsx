import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { overconfidenceGameAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './OverconfidenceGame.module.css';
import Navbar from '../../components/Navbar.jsx'; 

const OverconfidenceGame = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState(Array(10).fill({ lowerBound: '', upperBound: '' }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // 预定义的10个问题
  const questions = [
    "太阳的寿命(单位:十亿年)",
    "全世界的陆地面积(单位:千平方公里)",
    "联合国成员国（即会员国）的数目（单位：个）",
    "人体肌肉的总数（单位：块）",
    "2012年中国人口老龄化率(以百分比表示)",
    "牛顿发现万有引力的年份（具体的年份时间）",
    "2010年中国回族人口（单位：千人）",
    "东方明珠塔高度(单位:米)",
    "中国南北跨度(单位:公里)",
    "大西洋的深度(单位:米)"
  ];

  // 处理输入变化
  const handleInputChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      ...newAnswers[index],
      [field]: value
    };
    setAnswers(newAnswers);
  };

  // 验证所有答案是否已填写
  const validateAnswers = () => {
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (!answer.lowerBound || !answer.upperBound) {
        // alert(`请填写第 ${i + 1} 个问题的上下限值`);
        toast.error(`请填写第 ${i + 1} 个问题的上下限值`);
        return false;
      }
      if (parseFloat(answer.lowerBound) >= parseFloat(answer.upperBound)) {
        // alert(`第 ${i + 1} 个问题：最低值必须小于最高值`);
        toast.error(`第 ${i + 1} 个问题：最低值必须小于最高值`);
        return false;
      }
    }
    return true;
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

    // 格式化答案数据
    const formattedAnswers = answers.map((answer, index) => ({
      questionNumber: index + 1,
      lowerBound: parseFloat(answer.lowerBound),
      upperBound: parseFloat(answer.upperBound)
    }));

    const submitData = {
      userId: user._id,
      answers: formattedAnswers
    };

    overconfidenceGameAPI.submit(submitData)
      .then((response) => {
        if (response.status === 201) {
          // alert('提交成功！感谢您的参与。');
          toast.success('提交成功！感谢您的参与。');
          setHasSubmitted(true);
          // 提交成功后清空表单
          setAnswers(Array(10).fill({ lowerBound: '', upperBound: '' }));
        }
      })
      .catch((error) => {
        const { response } = error;
        if (response?.status === 409) {
          // alert('您已经完成过这个游戏，不能重复参与');
          toast.error('您已经完成过这个游戏，不能重复参与');
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

  // 重置表单
  const handleReset = () => {
    setAnswers(Array(10).fill({ lowerBound: '', upperBound: '' }));
  };

  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.completedMessage}>
            <h2>感谢参与！</h2>
            <p>您已经完成过过度自信游戏，无法重复参与。</p>
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
          <h1>过度自信测试</h1>
          <p>请为以下每个问题提供您认为的合理范围（最低值和最高值）</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {questions.map((question, index) => (
            <div key={index} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>第 {index + 1} 题</span>
                <h3 className={styles.questionText}>{question}</h3>
              </div>
              
              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor={`lower-${index}`}>最低值：</label>
                  <input
                    id={`lower-${index}`}
                    type="number"
                    step="any"
                    value={answers[index].lowerBound}
                    onChange={(e) => handleInputChange(index, 'lowerBound', e.target.value)}
                    placeholder="请输入最低值"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className={styles.inputField}>
                  <label htmlFor={`upper-${index}`}>最高值：</label>
                  <input
                    id={`upper-${index}`}
                    type="number"
                    step="any"
                    value={answers[index].upperBound}
                    onChange={(e) => handleInputChange(index, 'upperBound', e.target.value)}
                    placeholder="请输入最高值"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              disabled={isSubmitting}
            >
              重置
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

export default OverconfidenceGame;