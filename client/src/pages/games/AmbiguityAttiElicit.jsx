import React, { useState } from "react";
import { ambiguityAttiAPI } from '../../services/api.js'; 
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './AmbiguityAttiElicit.module.css';
import Navbar from '../../components/Navbar.jsx';  

const AmbiguityAttiElicit = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert('用户信息错误，请重新登录');
      return;
    }

    setLoading(true);
    

    const submitData = {
      userId: user._id,
      ambiguityAttitude: parseInt(selectedOption)
    };

    ambiguityAttiAPI.submit(submitData)
    .then((response) => {
      // console.log('✅ 成功响应:', response);
      // console.log('✅ 响应状态:', response.status);
      // console.log('✅ 响应数据:', response.data);
        
      if (response.status === 201) {
        alert('提交成功！感谢您的参与。');
        setHasSubmitted(true);
      }
    })
    .catch((error) => {

      // console.log('🔍 完整错误对象:', error);
      // console.log('🔍 错误响应:', error.response);
      // console.log('🔍 错误状态:', error.response?.status);
      // console.log('🔍 错误数据:', error.response?.data);
      // console.log('🔍 错误消息:', error.message);

      const { response } = error;
      if (response?.status === 409) {
        alert('你已经提交过相关回答，无法重复提交。');
        setHasSubmitted(true);
      } else {
        // 其他错误
        console.error('提交失败:', error);
        alert(`${response?.data?.message || '提交失败，请重试'}`);
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleOptionChange = (optionNumber) => {
    setSelectedOption(optionNumber.toString());
  };

  // 模糊偏好测试表格数据
  const ambiguityOptions = [
    { id: 1, boxK: 100, boxU: "Unknown" },
    { id: 2, boxK: 90, boxU: "Unknown" },
    { id: 3, boxK: 80, boxU: "Unknown" },
    { id: 4, boxK: 70, boxU: "Unknown" },
    { id: 5, boxK: 60, boxU: "Unknown" },
    { id: 6, boxK: 50, boxU: "Unknown" },
    { id: 7, boxK: 40, boxU: "Unknown" },
    { id: 8, boxK: 30, boxU: "Unknown" },
    { id: 9, boxK: 20, boxU: "Unknown" },
    { id: 10, boxK: 10, boxU: "Unknown" },
    { id: 11, boxK: 0, boxU: "Unknown" },
  ];

  // 如果已经提交过，显示完成页面
  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div className={styles.completedInfo}>
          <h2>✅ 模糊偏好测试已完成</h2>
          <p>您已经成功提交问卷，感谢您的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>模糊偏好测试</h1>
      <h2>请选择您偏好的选项。注意：您需要从Box K和Box U之间做出选择。</h2>
      
      <div className={styles.instructions}>
        <h3>测试说明：</h3>
        <p>在以下选项中，Box K包含确定的金额，Box U包含未知的金额。请选择您偏好的选项。</p>
        <p>您的选择将帮助我们了解您对确定性和不确定性的偏好程度。</p>
      </div>

      <div className={styles.tableContainer}>
        <h2>模糊偏好选择表</h2>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>选择</th>
              <th>序号</th>
              <th>Box K (确定金额)</th>
              <th>Box U (未知金额)</th>
            </tr>
          </thead>
          <tbody>
            {ambiguityOptions.map((option, index) => (
              <tr 
                key={option.id} 
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                onClick={() => handleOptionChange(option.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <input
                    type="radio"
                    name="ambiguityOption"
                    value={option.id}
                    checked={selectedOption === option.id.toString()}
                    onChange={() => handleOptionChange(option.id)}
                  />
                </td>
                <td>{option.id}</td>
                <td>${option.boxK.toFixed(2)}</td>
                <td>{option.boxU}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.selectionInfo}>
        <strong>您选择的选项: </strong>
        {selectedOption ? `选项 ${selectedOption} (Box K: $${ambiguityOptions.find(opt => opt.id === parseInt(selectedOption))?.boxK.toFixed(2)}, Box U: Unknown)` : '尚未选择'}
      </div>

      {/* 提交按钮 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={loading || !selectedOption}
        >
          {loading ? '提交中...' : '提交测试'}
        </button>
      </div>
    </div>
  );
}

export default AmbiguityAttiElicit;