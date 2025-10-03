// This .jsx is designed for Risk Attitudes Elicitation Game.

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { riskAttiAPI } from '../services/api'; 
import { useAuth } from '../contexts/AuthContext';
import './RiskAttiElicit.css'; // 导入外部样式
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar

const RiskAttiElicit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    
    riskAttiAPI.submit({
      userId: user._id,
      riskAttitude: parseInt(selectedOption)
    })
    .then((response) => {
      if (response.status === 201) {
        alert('风险评估提交成功！感谢您的参与。');
        setHasSubmitted(true);
      }

      if (response.status === 200) {
        alert('您已经提交过风险评估，无法重复提交');
        setHasSubmitted(true);
      }
    })
    .catch((error) => {
      console.error('提交失败:', error);
      alert(`${error.response?.data?.message || '提交失败，请重试'}`);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleOptionChange = (optionNumber) => {
    setSelectedOption(optionNumber.toString());
  };

  // 表格数据
  const seqNumber = [
    { order: "1" },
    { order: "2" },
    { order: "3" },
    { order: "4" },
    { order: "5" },
    { order: "6" },
    { order: "7" },
    { order: "8" },
    { order: "9" },
    { order: "10" },
  ];

  const optionAData = [
    { part1: "1/10", value1: "$2.00", part2: "9/10", value2: "$1.60" },
    { part1: "2/10", value1: "$2.00", part2: "8/10", value2: "$1.60" },
    { part1: "3/10", value1: "$2.00", part2: "7/10", value2: "$1.60" },
    { part1: "4/10", value1: "$2.00", part2: "6/10", value2: "$1.60" },
    { part1: "5/10", value1: "$2.00", part2: "5/10", value2: "$1.60" },
    { part1: "6/10", value1: "$2.00", part2: "4/10", value2: "$1.60" },
    { part1: "7/10", value1: "$2.00", part2: "3/10", value2: "$1.60" },
    { part1: "8/10", value1: "$2.00", part2: "2/10", value2: "$1.60" },
    { part1: "9/10", value1: "$2.00", part2: "1/10", value2: "$1.60" },
    { part1: "10/10", value1: "$2.00", part2: "0/10", value2: "$1.60" },
  ];

  const optionBData = [
    { part1: "1/10", value1: "$3.85", part2: "9/10", value2: "$0.10" },
    { part1: "2/10", value1: "$3.85", part2: "8/10", value2: "$0.10" },
    { part1: "3/10", value1: "$3.85", part2: "7/10", value2: "$0.10" },
    { part1: "4/10", value1: "$3.85", part2: "6/10", value2: "$0.10" },
    { part1: "5/10", value1: "$3.85", part2: "5/10", value2: "$0.10" },
    { part1: "6/10", value1: "$3.85", part2: "4/10", value2: "$0.10" },
    { part1: "7/10", value1: "$3.85", part2: "3/10", value2: "$0.10" },
    { part1: "8/10", value1: "$3.85", part2: "2/10", value2: "$0.10" },
    { part1: "9/10", value1: "$3.85", part2: "1/10", value2: "$0.10" },
    { part1: "10/10", value1: "$3.85", part2: "0/10", value2: "$0.10" },
  ];


  // 如果已经提交过，显示完成页面
  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>✅ 风险评估已完成</h2>
          <p>您已经成功提交风险评估问卷，感谢您的参与！</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '10px 25px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Risk Elicitation Game</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>您选择的选项: </strong>
        {selectedOption ? `选项 ${selectedOption}` : '尚未选择'}
      </div>

      <div className="table-container">
        <h2>选项对比表</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>选择</th>
              <th>序号</th>
              <th>Option A</th>
              <th>Option B</th>
            </tr>
          </thead>
          <tbody>
            {optionAData.map((item, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                onClick={() => handleOptionChange(index + 1)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <input
                    type="radio"
                    name="riskOption"
                    value={index + 1}
                    checked={selectedOption === (index + 1).toString()}
                    onChange={() => handleOptionChange(index + 1)}
                  />
                </td>
                <td>{seqNumber[index].order}</td>
                <td>
                  {item.part1} of {item.value1},&nbsp;&nbsp;&nbsp;&nbsp;
                  {item.part2} of {item.value2}
                </td>
                <td>
                  {optionBData[index].part1} of {optionBData[index].value1},&nbsp;&nbsp;&nbsp;&nbsp;
                  {optionBData[index].part2} of {optionBData[index].value2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 提交按钮 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleSubmit}
          disabled={loading || !selectedOption}
          style={{
            padding: '10px 30px',
            backgroundColor: !selectedOption ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: !selectedOption ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '提交中...' : '提交评估'}
        </button>
      </div>
    </div>
  );
}

export default RiskAttiElicit;