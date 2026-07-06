import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import BackToTop from '../../components/BackToTop.jsx';
import styles from './BehavScienceSyllabus.module.css';

export default function CourseInfo() {
  return (
    <div>
      <Navbar />
      <BackToTop />
      <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerBadge}>Course Syllabus</div>
        <h1>行为经济学</h1>
        <p className={styles.teacher}>教师：王兆祺</p>
        <p className={styles.dept}>Department of Finance, School of Economics</p>
        <p className={styles.email}>wzqteaching@gmail.com</p>
        <p className={styles.subtitle}>About the Name of the Course...</p>
      </header>
      </div>
    </div>
  )
}