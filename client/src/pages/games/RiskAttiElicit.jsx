// This .jsx is designed for Risk Attitudes Elicitation Game.

import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { riskAttiAPI } from '../../services/api.js'; 
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './RiskAttiElicit.module.css'; 
import Navbar from '../../components/Navbar.jsx';  

const RiskAttiElicit = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      // alert('用户信息错误，请重新登录');
      toast.success('用户信息错误，请重新登录');
      return;
    }

    setLoading(true);
    
    riskAttiAPI.submit({
      userId: user._id,
      riskAttitude: parseInt(selectedOption)
    })
    .then((response) => {
      if (response.status === 201) {
        // alert('提交成功！感谢您的参与。');
        toast.success('提交成功！感谢您的参与。');
        setHasSubmitted(true);
      }
    })
    .catch((error) => {
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
        <div className={styles.completedInfo}>
          <h2>✅ 风险评估已完成</h2>
          <p>你已经成功提交风险评估问卷，感谢您的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>游戏说明</h1>
      <div className={styles.instructions}>
        <ul>
          <li>我们以序号1的选项A为例，</li>
          <li>“1/10 of $2.00，  9/10 of $1.60” 的意思是选择这个选项有十分之一的概率能拿到2美元，十分之九的概率能够拿到1.6美元。</li>
          <li>同理，序号1所对应的选项B的意思是：选择这个选项有十分之一的概率能拿到3.85美元，十分之九的概率能够拿到0.10美元。</li>
          <li>你需要思考：从哪个序号开始，对于你来说，这个序号及其之后的所有序号中，选项B都是比选项A更有吸引力的；也即在那个序号之前，选项A比选项B更有吸引力。</li>
          <li><strong>因此，请选择你从哪个序号开始，自那以后你将一直选择选项B。</strong></li>
        </ul>
      </div>
      <div className={styles.tableContainer}>
        {/* <h2>选项对比表</h2> */}
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>选择</th>
              <th>序号</th>
              <th>选项A</th>
              <th>选项B</th>
            </tr>
          </thead>
          <tbody>
            {optionAData.map((item, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
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
      <div>
        <strong>你选择的序号: </strong>
        {selectedOption ? `序号 ${selectedOption}` : '尚未选择'}
      </div>

      {/* 提交按钮 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={loading || !selectedOption}
        >
          {loading ? '提交中...' : '提交评估'}
        </button>
      </div>
    </div>
  );
}

export default RiskAttiElicit;