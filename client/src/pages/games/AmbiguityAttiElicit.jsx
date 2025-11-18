import React, { useState } from "react";
import toast from 'react-hot-toast';
import { ambiguityAttiAPI } from '../../services/api.js'; 
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './AmbiguityAttiElicit.module.css';
import Navbar from '../../components/Navbar.jsx';  
import SubmitButton from '../../components/Buttons/SubmitButton.jsx';

const AmbiguityAttiElicit = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      // alert('用户信息错误，请重新登录');
      toast.error('用户信息错误，请重新登录');
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
        // alert('提交成功！感谢您的参与。');
        toast.success('提交成功！感谢您的参与。');
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
        // alert('你已经提交过相关回答，无法重复提交。');
        toast.error('你已经提交过相关回答，无法重复提交。');
        setHasSubmitted(true);
      } else {
        // 其他错误
        console.error('提交失败:', error);
        // alert(`${response?.data?.message || '提交失败，请重试'}`);
        toast.error(`${response?.data?.message || '提交失败，请重试'}`);
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
          <p>你已经成功提交问卷，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>游戏说明</h1>
      <div className={styles.gameContainer}>
        <div className={styles.instructions}>
          <ul>
            <li>有两个盒子，一个盒子叫K，一个盒子叫U。</li>
            <li>每个盒子里面都有100个球，这些球的颜色要么是黑色，要么是白色。</li>
            <li>盒子K里的黑球白球相对数量是已知的。</li>
            <li>盒子U里的黑球白球相对数量是未知的。</li>
            <li>我们随机从你所选择的那个盒子里抽出一个球，如果那个球的颜色是黑色的话，你就会得到20元人民币。</li>
            <li><span style={{color: 'red'}}>你需要在下面的11个选项里面，选择其中一个序号；表明这个序号及其以后所有的序号的选项中，盒子U都是比盒子K更加有吸引力的选项。</span></li>
          </ul>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>选择</th>
                <th>序号</th>
                <th>盒子 K (确定黑球数)</th>
                <th>盒子 U (未知黑球数)</th>
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
                  <td>{option.boxK}</td>
                  <td>{option.boxU}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.selectionInfo}>
          <strong>你选择的选项: </strong>
          {selectedOption ? `选项 ${selectedOption} (盒子 K: ${ambiguityOptions.find(opt => opt.id === parseInt(selectedOption))?.boxK}个黑球,  盒子 U: 未知黑球数)` : '尚未选择'}
        </div>
        {/* 提交按钮 */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <SubmitButton onClick={handleSubmit} type="submit" disabled={loading || !selectedOption}>
                {loading ? '提交中...' : '提交'}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default AmbiguityAttiElicit;