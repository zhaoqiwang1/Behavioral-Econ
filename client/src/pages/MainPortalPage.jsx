import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import styles from './MainPortalPage.module.css';

const MainPortalPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.portalContainer}>
      <Navbar />
      <header className={styles.welcomeMessage}>
        <h1 className={styles.welcomeMessageTitle}>EMPOWER YOUR MIND</h1>
        <p className={styles.welcomeMessageDescription}>
          Discover a world of learning possibilities with 
          <span id={styles.welcomeMessageHightlight}> innovative </span>
          educational platform.
        </p>
      </header>

      <section className={styles.logicCourseSection}>
        <div className={styles.logicCourseIntro}>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              形式逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              研究严格的推理结构和符号化规则，帮助我们判断一个结论是否必然由前提推出。<br />
              通过学习形式逻辑，让你掌握思考中最精确、最可靠的工具。
            </p>
          </div>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              非形式逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              非形式逻辑研究日常语言与实际论证中的逻辑，关注论证的合理性、证据的有效性以及谬误。<br />
              它能够提高分析与判断能力，使读者在学术、社会和职业环境中更善于识别和构建有效论证。
            </p>
          </div>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              辩证逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              辩证逻辑关注事物发展中的矛盾、联系和变化规律，强调整体性和动态过程。<br />
              通过理解辩证逻辑，可以培养系统思维能力，更深入地分析复杂问题及其发展趋势。
            </p>
          </div>
          <div className={styles.logicCourseBtnPosition}>
            <button className={styles.portalPageBtnLogic} onClick={() => navigate('/courses/logic')}>
             进入课程
            </button>
          </div>
        </div>

        <div className={styles.logicCourseImages}>
          <img src="/assets/images/portalPage/aristotle.jpg" alt="logic-image"/>
          <img src="/assets/images/portalPage/hegel.jpg" alt="logic-image"/>
        </div>

      </section>

      <section className={styles.behavSciCourseSection}>
        <button onClick={() => navigate('/courses/behavioral-science')}>
          <h1>行为经济学</h1>
        </button>
      </section>

      <section className={styles.rProgramCourseSection}>
        <button onClick={() => navigate('/courses/r-programming')}>
          <h1>R语言</h1>
        </button>
      </section>
    </div>
  );
};

export default MainPortalPage;