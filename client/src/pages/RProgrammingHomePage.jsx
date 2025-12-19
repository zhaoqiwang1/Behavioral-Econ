// RProgrammingHomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import styles from './RProgrammingHomePage.module.css';

const RProgrammingHomePage = () => {
  return (
    <div>
       <Navbar />
      {/* 欢迎界面 */}
      <header className={styles.welcomeMessage}>
      </header>
      {/* R Basics 内容详解 */}
      <div 
        className={styles.classSchedules}
        style={{
          backgroundImage: "url('../assets/images/portalPage/r4.jpg')"
        }}
      >
        <div className={styles.scheduleContainer}>
          {/* 左侧：文字内容 */}
          <div className={styles.scheduleLeft}>
            <h2>R Basics</h2>
            <ul>
              <li>本部分内容围绕 R 语言基础展开。</li>
              <li>Part 1 涵盖 R 和 RStudio 安装、界面熟悉、脚本使用、变量赋值与命名、数据类型、基础运算、字符串拼接、条件判断、循环与函数创建调用等入门内容；</li>
              <li>Part 2 聚焦向量、列表、矩阵、数据框四种核心数据结构的创建、访问、修改、增删等操作，以及数据的导入导出。</li>
            </ul>
          </div>
          
          {/* 右侧：链接按钮 */}
          <div className={styles.scheduleRight}>
            <a 
              href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkBox}
            >
              Basics_Part1（HTML版）
            </a>
            
            <a 
              href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              download
              className={styles.linkBox}
            >
              下载 PDF 版
            </a>
          </div>
        </div>
      </div>
      {/* R Plot 内容详解 */}
      <div 
        className={styles.classSchedules}
        style={{
          backgroundImage: "url('../assets/images/portalPage/r4.jpg')"
        }}
      >
        <div className={styles.scheduleContainer}>
          {/* 左侧：文字内容 */}
          <div className={styles.scheduleLeft}>
            <h2>R Plot</h2>
            <ul>
              <li>本部分内容聚焦 R 语言绘图知识，从基础绘图到 ggplot2 应用逐步深入。</li>
              <li>Part1 讲解基础绘图，包括散点图、饼图、条形图、直方图、密度图的创建，以及点线样式、颜色、标签等参数设置；</li>
              <li>Part2 介绍图例定制、多图矩阵排列、图形叠加、箱线图、CDF 图绘制及坐标轴与字体美化；</li>
              <li>Part3 专注 ggplot2 包，涵盖其安装与各类图表（柱状图、直方图、密度图等）绘制，还有主题设置、时间序列可视化、文本标注、标题图例美化等进阶操作，助力大家灵活实现数据可视化。</li>
            </ul>
          </div>
          
          {/* 右侧：链接按钮 */}
          <div className={styles.scheduleRight}>
            <a 
              href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkBox}
            >
              Basics_Part1（HTML版）
            </a>
            
            <a 
              href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              download
              className={styles.linkBox}
            >
              下载 PDF 版
            </a>
          </div>
        </div>
      </div>
      {/* R Data Cleaning 内容详解 */}

      {/* R Regression 内容详解 */}

      {/* R Markdown 内容详解 */}
    </div>
  );
};

export default RProgrammingHomePage;