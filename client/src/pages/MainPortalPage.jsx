import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import styles from './MainPortalPage.module.css';

const MainPortalPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.portalContainer}>
      <Navbar />
      <div className={styles.portalContent}>
        <header className={styles.portalHeader}>
          <h1>欢迎来到教学平台</h1>
          <p>选择你要访问的课程</p>
        </header>
        
        <main className={styles.coursesSection}>
          <div className={styles.courseGrid}>
            <div 
              className={styles.courseCard}
              onClick={() => navigate('/courses/behavioral-science')}
            >
              <h2>行为科学实验课程</h2>
              <p>参与各种行为科学实验，了解人类决策模式</p>
            </div>
            
            <div 
              className={styles.courseCard}
              onClick={() => navigate('/courses/r-programming')}
            >
              <h2>R Programming</h2>
              <p>学习R语言编程和数据分析</p>
            </div>

            <div 
              className={styles.courseCard}
              onClick={() => navigate('/courses/logic')}
            >
              <h2>逻辑学</h2>
              <p>掌握逻辑思维和推理方法</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPortalPage;