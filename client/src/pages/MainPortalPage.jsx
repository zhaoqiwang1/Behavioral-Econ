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
            
            {/* 可以继续添加更多课程卡片 */}
            <div className={styles.comingSoonCard}>
              <h2>更多课程</h2>
              <p>即将推出...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPortalPage;