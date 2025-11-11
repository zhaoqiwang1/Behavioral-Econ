import React, { useState } from "react";
import toast from 'react-hot-toast';
import { confirmationBiasGameAPI } from '../../services/api.js'; 
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';  

const ConfirmationBiasGame = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({
    stanceTech: '',
    stanceEcon: '',
    confirmBiasTech: '',
    confirmBiasEcon: '',
    evalBiasTechSupport: '',
    evalBiasTechOppose: '',
    evalBiasEconSupport: '',
    evalBiasEconOppose: ''
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error('用户信息错误，请重新登录');
      return;
    }

    // 检查是否所有问题都已回答
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    if (!allAnswered) {
      toast.error('请回答所有问题');
      return;
    }

    setLoading(true);
    
    confirmationBiasGameAPI.submit({
      userId: user._id,
      ...answers
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
        toast.error('你已经提交过游戏答案，无法重复提交。');
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
        <div>
          <h2>✅ 游戏已完成</h2>
          <p>你已经成功提交游戏答案，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>确认偏见游戏</h1>
      
      <form onSubmit={handleSubmit}>
        {/* 立场问题 */}
        <div>
          <h3>立场问题</h3>
          
          <div>
            <p>1. 你对技术的立场是？</p>
            <label>
              <input
                type="radio"
                name="stanceTech"
                value="support"
                checked={answers.stanceTech === 'support'}
                onChange={() => handleInputChange('stanceTech', 'support')}
              />
              支持
            </label>
            <label>
              <input
                type="radio"
                name="stanceTech"
                value="oppose"
                checked={answers.stanceTech === 'oppose'}
                onChange={() => handleInputChange('stanceTech', 'oppose')}
              />
              反对
            </label>
          </div>

          <div>
            <p>2. 你对经济的立场是？</p>
            <label>
              <input
                type="radio"
                name="stanceEcon"
                value="support"
                checked={answers.stanceEcon === 'support'}
                onChange={() => handleInputChange('stanceEcon', 'support')}
              />
              支持
            </label>
            <label>
              <input
                type="radio"
                name="stanceEcon"
                value="oppose"
                checked={answers.stanceEcon === 'oppose'}
                onChange={() => handleInputChange('stanceEcon', 'oppose')}
              />
              反对
            </label>
          </div>
        </div>

        {/* 确认偏见问题 */}
        <div>
          <h3>确认偏见问题</h3>
          
          <div>
            <p>3. 技术确认偏见</p>
            <label>
              <input
                type="radio"
                name="confirmBiasTech"
                value="support"
                checked={answers.confirmBiasTech === 'support'}
                onChange={() => handleInputChange('confirmBiasTech', 'support')}
              />
              支持
            </label>
            <label>
              <input
                type="radio"
                name="confirmBiasTech"
                value="oppose"
                checked={answers.confirmBiasTech === 'oppose'}
                onChange={() => handleInputChange('confirmBiasTech', 'oppose')}
              />
              反对
            </label>
          </div>

          <div>
            <p>4. 经济确认偏见</p>
            <label>
              <input
                type="radio"
                name="confirmBiasEcon"
                value="support"
                checked={answers.confirmBiasEcon === 'support'}
                onChange={() => handleInputChange('confirmBiasEcon', 'support')}
              />
              支持
            </label>
            <label>
              <input
                type="radio"
                name="confirmBiasEcon"
                value="oppose"
                checked={answers.confirmBiasEcon === 'oppose'}
                onChange={() => handleInputChange('confirmBiasEcon', 'oppose')}
              />
              反对
            </label>
          </div>
        </div>

        {/* 评估偏见问题 */}
        <div>
          <h3>评估偏见问题 (1-5分，1=非常不同意，5=非常同意)</h3>
          
          <div>
            <p>5. 对技术支持立场的评估</p>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="evalBiasTechSupport"
                  value={num}
                  checked={answers.evalBiasTechSupport === num.toString()}
                  onChange={() => handleInputChange('evalBiasTechSupport', num.toString())}
                />
                {num}
              </label>
            ))}
          </div>

          <div>
            <p>6. 对技术反对立场的评估</p>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="evalBiasTechOppose"
                  value={num}
                  checked={answers.evalBiasTechOppose === num.toString()}
                  onChange={() => handleInputChange('evalBiasTechOppose', num.toString())}
                />
                {num}
              </label>
            ))}
          </div>

          <div>
            <p>7. 对经济支持立场的评估</p>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="evalBiasEconSupport"
                  value={num}
                  checked={answers.evalBiasEconSupport === num.toString()}
                  onChange={() => handleInputChange('evalBiasEconSupport', num.toString())}
                />
                {num}
              </label>
            ))}
          </div>

          <div>
            <p>8. 对经济反对立场的评估</p>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="evalBiasEconOppose"
                  value={num}
                  checked={answers.evalBiasEconOppose === num.toString()}
                  onChange={() => handleInputChange('evalBiasEconOppose', num.toString())}
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        {/* 提交按钮 */}
        <div>
          <button 
            type="submit"
            disabled={loading}
          >
            {loading ? '提交中...' : '提交答案'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmationBiasGame;