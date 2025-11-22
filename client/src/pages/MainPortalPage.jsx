import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import styles from './MainPortalPage.module.css';

const MainPortalPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.portalContainer}>
      <Navbar />
      {/* 欢迎界面 */}
      <header className={styles.welcomeMessage}>
        <h1 className={styles.welcomeMessageTitle}>EMPOWER YOUR MIND</h1>
        <p className={styles.welcomeMessageDescription}>
          Discover a world of learning possibilities with 
          <span id={styles.welcomeMessageHightlight}> innovative </span>
          educational platform.
        </p>
      </header>

      {/* 行为经济学界面 */}
      <section className={styles.behavSciCourseSection}>
          <div className={styles.behavSciCourseImage}>
            <img src="/assets/images/portalPage/behavSciImage.jpg" alt="behavioral-science-image"/>
          </div>
          <div className={styles.behavSciCourseIntro}>
            <h1 className={styles.courseBehavSciTitle}>行为经济学</h1>
            <div className={styles.behavSciCourseIntroTitle}>
              <h1>主要内容</h1>
              <p>
                了解行为和实验经济金融领域的核心研究内容、研究方法及关键结论，建立对该领域的整体认知。通过文献品读，学习学术论文中的实验设计逻辑、数据收集方式与结论推导思路。认识行为经济学的研究发现在实际生活中的应用价值。
              </p>
            </div>
            <div className={styles.behavSciCourseItems}>
              <div className={styles.behavSciCourseIntroItem1}>
                <h1 className={styles.behavSciCourseItemTitle}>
                  讨论课题
                </h1>
                <p className={styles.behavSciCourseItemDescription}>
                  本课程讨论的课题涵盖行为经济学的经典与前沿研究，包括博弈论、非理性决策、社会偏好等内容。
                </p>
              </div>
              <div className={styles.behavSciCourseIntroItem2}>
                <h1 className={styles.behavSciCourseItemTitle}>
                  实验设计
                </h1>
                <p className={styles.behavSciCourseItemDescription}>
                  掌握严谨的实验室实验设计方法，学会针对经济金融中的决策问题设计实验，科学收集所需数据。
                </p>
              </div>
              <div className={styles.behavSciCourseIntroItem3}>
                <h1 className={styles.behavSciCourseItemTitle}>
                  数据分析
                </h1>
                <p className={styles.behavSciCourseItemDescription}>
                  学习基础 R 语言编程。包括数据可视化、数据清理、回归分析及 R Markdown 应用等实操技能。
                </p>
              </div>
              <div className={styles.behavSciCourseIntroItem4}>
                <h1 className={styles.behavSciCourseItemTitle}>
                  课堂游戏
                </h1>
                <p className={styles.behavSciCourseItemDescription}>
                  每次课程均安排课堂游戏，通过亲身参与积累数据，同时将理论知识落地到实践中。
                </p>
              </div>
            </div>

            <div className={styles.behavSciCourseBtnPosition}>
              <button className={styles.BtnBehavSci} onClick={() => navigate('/courses/behavioral-science')}>
                进入课程
              </button>
            </div>
          </div>
      </section>

      {/* 逻辑学界面 */}
      <section className={styles.logicCourseSection}>
        <div className={styles.logicCourseIntro}>
          <h1 className={styles.courseLogicTitle}>逻辑学</h1>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              形式逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              研究严格的推理结构和符号化规则，帮助我们判断一个结论是否必然由前提推出。通过学习形式逻辑，让你掌握思考中最精确、最可靠的工具。
            </p>
          </div>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              非形式逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              非形式逻辑研究日常语言与实际论证中的逻辑，关注论证的合理性、证据的有效性以及谬误。它能够提高分析与判断能力，使读者在学术、社会和职业环境中更善于识别和构建有效论证。
            </p>
          </div>
          <div className={styles.logicCourseIntroItem}>
            <h1 className={styles.logicCourseIntroTitle}>
              辩证逻辑
            </h1>
            <p className={styles.logicCourseIntroDescription}>
              辩证逻辑关注事物发展中的矛盾、联系和变化规律，强调整体性和动态过程。通过理解辩证逻辑，可以培养系统思维能力，更深入地分析复杂问题及其发展趋势。
            </p>
          </div>
          <div className={styles.logicCourseBtnPosition}>
            <button className={styles.BtnLogic} onClick={() => navigate('/courses/logic')}>
             进入课程
            </button>
          </div>
        </div>

        <div className={styles.logicCourseImages}>
          <img src="/assets/images/portalPage/aristotle.jpg" alt="logic-image"/>
          <img src="/assets/images/portalPage/hegel.jpg" alt="logic-image"/>
        </div>
      </section>


      {/* R语言界面 */}
      <section className={styles.rProgramCourseSection}>
        {/* <div className={styles.rProgrammingCourseImage}>
            <img src="/assets/images/portalPage/codingwithme7.jpg" alt="behavioral-science-image"/>
        </div>
        <div className={styles.rProgrammingCourseIntro}>
          <div className={styles.rProgrammingCourseIntroItem1}>
            <img src="/assets/images/portalPage/codingwithme7.jpg" alt="behavioral-science-image"/>
            <h1>basic</h1>
            Tailor your curriculum to meet the unique needs of your students. Our flexible platform allows educators to create personalized learning paths.  Our flexible platform allows educators to create personalized learning paths.
          </div>
           <div className={styles.rProgrammingCourseIntroItem2}>
            plot,
          </div>
          <div className={styles.rProgrammingCourseIntroItem2}>
            data cleaning,
          </div>
          <div className={styles.rProgrammingCourseIntroItem2}>
            regression,
          </div>
          <div className={styles.rProgrammingCourseIntroItem2}>
            R markdown,
          </div>
          <div className={styles.rProgrammingCourseIntroItem2}>
            git
          </div>
        </div> */}
        <button onClick={() => navigate('/courses/r-programming')}>
          <h1>R语言课程</h1>
        </button>
      </section>
    </div>
  );
};

export default MainPortalPage;