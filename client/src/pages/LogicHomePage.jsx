// LogicHomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import BackToTop from '../components/BackToTop.jsx';
import styles from './LogicHomePage.module.css';  

const LogicHomePage = () => {
  return (
    <div>
      <Navbar />
      <BackToTop />
      <div className={styles.container}>
        <h1 className={styles.title}>《逻辑学》正在筹备中...</h1>
      </div>
    </div>
  );
};

export default LogicHomePage;