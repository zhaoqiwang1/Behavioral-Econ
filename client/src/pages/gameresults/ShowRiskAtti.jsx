import React, { useState, useEffect } from 'react';
import { riskAttiAPI } from '../../services/api';
import Navbar from '../../components/Navbar.jsx';  
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './ShowRiskAtti.module.css';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  // 准备图表数据
  const prepareChartData = () => {
    // 统计每种风险偏好的数量
    const riskCounts = {};
    
    riskData.forEach(student => {
      const attitude = student.riskAttitude || '未填写';
      riskCounts[attitude] = (riskCounts[attitude] || 0) + 1;
    });

    const labels = Object.keys(riskCounts);
    const data = Object.values(riskCounts);

    return {
      labels,
      datasets: [
        {
          label: '学生数量',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // 图表配置选项
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '学生风险偏好分布',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '学生数量'
        }
      },
      x: {
        title: {
          display: true,
          text: '风险偏好类型'
        }
      }
    },
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        正在加载数据...
      </div>
    );
  }

  const chartData = prepareChartData();

  return (
    <div>
      <Navbar />
        <div className={styles.container}>
            
            <h1 className={styles.title}>学生风险偏好数据</h1>
            
            <div className={styles.summary}>
              <p>共收集到 {riskData.length} 名学生的数据</p>
            </div>
            
            {/* 柱状图部分 */}
            {riskData.length > 0 ? (
              <div className={styles.chartContainer}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className={styles.emptyState}>
                暂无学生数据
              </div>
            )}

            {/* 详细数据列表 */}
            {/* {riskData.length > 0 && (
              <div className={styles.studentList}>
                <h2>详细数据</h2>
                {riskData.map((student, index) => (
                  <div key={index} className={styles.studentCard}>
                    <p className={styles.studentInfo}>
                      <span className={styles.studentLabel}>用户名:</span> 
                      {student.studentName}
                    </p>
                    <p className={styles.studentInfo}>
                      <span className={styles.studentLabel}>学号:</span> 
                      {student.studentId}
                    </p>
                    <p className={styles.studentInfo}>
                      <span className={styles.studentLabel}>风险偏好:</span> 
                      {student.riskAttitude}
                    </p>
                    <p className={styles.studentInfo}>
                      <span className={styles.studentLabel}>提交时间:</span> 
                      {new Date(student.submittedAt).toLocaleString('zh-CN')}
                    </p>
                  </div>
                ))}
              </div>
            )} */}
        </div>
    </div>
   
  );
};

export default ShowRiskAttituides;