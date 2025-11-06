import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { mbtiElicitAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './MbtiElicit.module.css'; 
import Navbar from '../../components/Navbar.jsx';  

const MBTIElicit = () => {
  const { user } = useAuth();
  const [mbtiResult, setMbtiResult] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error('用户信息错误，请重新登录');
      return;
    }

    setLoading(true);
    
    mbtiElicitAPI.submit({
      userId: user._id,
      mbtiAnswers: mbtiResult
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

  // 如果已经提交过，显示完成页面
  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.completedInfo}>
          <h2>✅ MBTI测试已完成</h2>
          <p>你已经成功提交MBTI测试结果，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>请输入你的MBTI ~ </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.MBTIAnswers}>
          <label>MBTI结果：</label>
          <input
            type="text"
            value={mbtiResult}
            onChange={(e) => setMbtiResult(e.target.value)}
            placeholder=" 请输入大写英文，例如：INTJ、ENFP等等"
            required
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading || !mbtiResult.trim()}
        >
          {loading ? '提交中...' : '提交'}
        </button>
      </form>
    </div>
  );
};

export default MBTIElicit;