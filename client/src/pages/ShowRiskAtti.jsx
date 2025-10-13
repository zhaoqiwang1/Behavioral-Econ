import React, { useState, useEffect } from 'react';
import { riskAttiAPI } from '../services/api';

const ShowRiskAttituides = () => {
  const [riskData, setRiskData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await riskAttiAPI.getResults();
        if (response.data.success) {
          setRiskData(response.data.data);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>正在加载数据...</div>;
  }

  return (
    <div>
      <h1>学生风险偏好数据</h1>
      <p>共收集到 {riskData.length} 名学生的数据</p>
      
      {riskData.map((student, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>用户名:</strong> {student.studentName}</p>
          <p><strong>学号:</strong> {student.studentId}</p>
          <p><strong>风险偏好:</strong> {student.riskAttitude}</p>
          <p><strong>提交时间:</strong> {new Date(student.submittedAt).toLocaleString('zh-CN')}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowRiskAttituides;