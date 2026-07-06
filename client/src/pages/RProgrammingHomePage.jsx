// RProgrammingHomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import BackToTop from '../components/BackToTop.jsx';
import styles from './RProgrammingHomePage.module.css';
import toast from 'react-hot-toast';



const RProgrammingHomePage = () => {

  const navigate = useNavigate();

  const openHomeworkPdf = (pdfUrl, cardPwd) => {
    const inputPwd = prompt('请输入查看密码:');
    if (inputPwd === cardPwd) {
      // 密码正确，直接访问OSS压缩包链接触发下载
      window.location.href = pdfUrl;
    } else if (inputPwd !== null) {
      toast.error('密码错误');
    }
  };

  const openExam = (downloadUrl, examPwd) => {
    const inputPwd = prompt('请输入试题下载密码：');
    if (inputPwd === examPwd) {
      window.open(downloadUrl, '_blank');
    } else if (inputPwd !== null) {
      toast.error('密码错误，无法下载');
    }
  };

  return (
    <div>
       <Navbar />
       <BackToTop />
      {/* 欢迎界面 */}
      {/* <header className={styles.welcomeMessage}>
      </header> */}
      <div className={styles.welcomeMessage}>
        <h1 className={styles.welcomeMessageTitle}>FROM RAW DATA TO INSIGHTS</h1>
        <p className={styles.welcomeMessageDescription}>
          Master the complete workflow of
          <span id={styles.welcomeMessageHightlight}> data analysis in R, </span>
          from cleaning and modeling to creating compelling visual reports.
        </p>
        <button 
          className={styles.syllabusBtn}
          onClick={() => {
            navigate('/courses/r-programming/syllabus');
            window.scrollTo(0, 0); 
          }}
        >
          Syllabus
        </button>
        <button 
          className={styles.dataBtn}
          onClick={() => openExam("https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Data.zip", "dataPassword")} // 这里替换为实际的OSS压缩包链接和密码
        >
          Data
        </button>
      </div>
      <div className={styles.mainContent}>
        {/* R Basics 内容详解 */}
        <div className={styles.classSchedules}>
          {/* 全局半透明遮罩，通过 class 控制 */}
          <div className={styles.bgMask} />

          {/* 内容容器 */}
          <div className={styles.contentWrap}>
            {/* 顶部标题区域，对标产品页大标题 */}
            <div className={styles.sectionHeader}>
              <h1>R 编程基础 -- R Basics</h1>
              {/* <p>本部分内容围绕 R 语言基础展开。</p> */}
            </div>

            {/* 课程卡片容器，自适应2/3列布局 */}
            <div className={styles.cardsWrap}>
              {/* Part 1 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/more_analysis.jpg" 
                    alt="R Basics Part1 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>R Basics Part 1</h3>
                  <p>Part 1 涵盖 R 和 RStudio 安装、界面熟悉、脚本使用、变量赋值与命名、数据类型、基础运算、字符串拼接、条件判断、循环与函数创建调用等入门内容</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Basics_1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Basics_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>

              {/* Part 2 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/ok.jpg" 
                    alt="R Basics Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>R Basics Part 2</h3>
                  <p>Part 2 聚焦向量、列表、矩阵、数据框四种核心数据结构的创建、访问、修改、增删等操作，以及数据的导入导出。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Basics_2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Basics_2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* 新增Part3直接复制上面整套 courseCard 即可，布局自动适配三列 */}
            </div>
          </div>
        </div>
        {/* R Plot 内容详解 */}
        <div className={styles.classSchedules}>
          {/* 全局半透明遮罩，通过 class 控制 */}
          <div className={styles.bgMask} />

          {/* 内容容器 */}
          <div className={styles.contentWrap}>
            {/* 顶部标题区域，对标产品页大标题 */}
            <div className={styles.sectionHeader}>
              <h1>数据可视化 -- Data Visualization</h1>
              {/* <p>本部分内容聚焦 R 语言绘图知识，从基础绘图到 ggplot2 应用逐步深入。</p> */}
            </div>

            {/* 课程卡片容器，自适应2/3列布局 */}
            <div className={styles.cardsWrap}>
              {/* Part 1 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/dtaVisualization1.jpg" 
                    alt="R Plot Part1 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>R Plot Part 1</h3>
                  <p>Part 1 讲解基础绘图，包括散点图、饼图、条形图、直方图、密度图的创建，以及点线样式、颜色、标签等参数设置。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>

              {/* Part 2 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/dtaVisualization3.png" 
                    alt="R Plot Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>R Plot Part 2</h3>
                  <p>Part 2 介绍图例定制、多图矩阵排列、图形叠加、箱线图、CDF 图绘制及坐标轴与字体美化。全面提升图表表现力。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* Part 3 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/ok.png" 
                    alt="R Plot Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>R Plot Part 3</h3>
                  <p>Part 3 专注 ggplot2 包，涵盖其安装与各类图表绘制，还有主题设置、时间序列可视化、文本标注、标题图例美化等进阶操作，助力大家灵活实现数据可视化。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part3.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Plot_Part3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* 新增Part3直接复制上面整套 courseCard 即可，布局自动适配三列 */}
            </div>
          </div>
        </div>
        {/* R Data Cleaning 内容详解 */}
        <div className={styles.classSchedules}>
          {/* 全局半透明遮罩，通过 class 控制 */}
          <div className={styles.bgMask} />

          {/* 内容容器 */}
          <div className={styles.contentWrap}>
            {/* 顶部标题区域，对标产品页大标题 */}
            <div className={styles.sectionHeader}>
              <h1>数据清理 -- Data Cleaning</h1>
              {/* <p>本部分内容聚焦 R 语言数据清洗，从基础操作到 dplyr 包应用，再到时间与字符串处理逐步深入。</p> */}
            </div>

            {/* 课程卡片容器，自适应2/3列布局 */}
            <div className={styles.cardsWrap}>
              {/* Part 1 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning3.png" 
                    alt="Data Cleaning Part1 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Data Cleaning Part 1</h3>
                  <p>讲解 R 语言数据清洗的基础操作与核心逻辑。内容涵盖数据的读取与基础计算；同时深入探讨缺失值处理、异常值清洗等应用。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>

              {/* Part 2 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning2.png" 
                    alt="R Basics Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Data Cleaning Part 2</h3>
                  <p>Part 2 聚焦 dplyr 包的高效数据操纵语法。详细解析管道操作的用法；涵盖数据计数、分组统计、行列合并技术，等多种数据关联策略。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* Part 3 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning1.png" 
                    alt="Data Cleaning Part3 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Data Cleaning Part 3</h3>
                  <p>Part 3 专注于时间序列与字符串的高级处理技巧。利用 lubridate 包讲解日期时间的解析；结合 stringr 包介绍非结构化数据清洗难题。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part3.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* 新增Part3直接复制上面整套 courseCard 即可，布局自动适配三列 */}
            </div>
          </div>
        </div>
        {/* R Regression 内容详解 */}
        <div className={styles.classSchedules}>
          {/* 全局半透明遮罩，通过 class 控制 */}
          <div className={styles.bgMask} />

          {/* 内容容器 */}
          <div className={styles.contentWrap}>
            {/* 顶部标题区域，对标产品页大标题 */}
            <div className={styles.sectionHeader}>
              <h1>回归分析 -- Regression Analysis </h1>
              {/* <p>本部分内容聚焦 R 语言回归分析，从线性模型到非线性建模，再到结果输出与排版逐步深入。</p> */}
            </div>

            {/* 课程卡片容器，自适应2/3列布局 */}
            <div className={styles.cardsWrap}>
              {/* Part 1 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression1.png" 
                    alt="Regression Part1 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Regression Part 1</h3>
                  <p>Part 1 讲解线性回归的基础建模与诊断。内容涵盖函数构建模型, 以及分类变量与交互项的回归设置与系数解释。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>

              {/* Part 2 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression2.png" 
                    alt="Regression Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Regression Part 2</h3>
                  <p>Part 2 聚焦解析 Logit 模型，介绍多项式回归，并深入讲解 Bootstrap 自助法原理。通过重抽样技术解决小样本下的系数分布与置信区间估计问题。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* Part 3 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression3.png" 
                    alt="Regression Part3 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Regression Part 3</h3>
                  <p>Part 3 专注于回归结果的规范化输出与排版美化。利用 stargazer 包导出回归表格，以及使用 modelsummary 和 huxtable 包将回归结果整合为 Word 文档。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part3.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Regression_Part3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* 新增Part3直接复制上面整套 courseCard 即可，布局自动适配三列 */}
            </div>
          </div>
        </div>
        {/* R Markdown 内容详解 */}
        <div className={styles.classSchedules}>
          {/* 全局半透明遮罩，通过 class 控制 */}
          <div className={styles.bgMask} />

          {/* 内容容器 */}
          <div className={styles.contentWrap}>
            {/* 顶部标题区域，对标产品页大标题 */}
            <div className={styles.sectionHeader}>
              <h1>分析报告 -- R Markdown </h1>
              {/* <p>本部分内容聚焦 R Markdown 应用，从基础语法与排版到学术表格与公式，再到交互式可视化逐步深入。</p> */}
            </div>

            {/* 课程卡片容器，自适应2/3列布局 */}
            <div className={styles.cardsWrap}>
              {/* Part 1 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown1.png" 
                    alt="Markdown Part1 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Markdown Part 1</h3>
                  <p>Part 1 讲解 R Markdown 的基础语法与代码块控制。内容涵盖文本格式化、图片插入等，以及利用 gridExtra 包实现多图形的矩阵式排列与组合布局。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>

              {/* Part 2 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown2.png" 
                    alt="Markdown Part2 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Markdown Part 2</h3>
                  <p>Part 2 聚焦于表格制作、数学公式与学术引用规范。介绍 LaTeX 数学公式的编写，并系统讲解文献引用的管理方法，包括 BibTeX 文件配置设置及目录生成技巧。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part2.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* Part 3 卡片 */}
              <div className={styles.courseCard}>
                <div className={styles.cardImgBox}>
                  <img 
                    src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown3_1.png" 
                    alt="Markdown Part3 封面"
                  />
                </div>
                <div className={styles.cardText}>
                  <h3>Markdown Part 3</h3>
                  <p>Part 3 专注于交互式可视化与动态图表展示。讲解 3D 散点图的绘制，实现数据表格的交互式展示，并深入介绍时间序列数据可视化的应用。</p>
                </div>
                <div className={styles.cardBtns}>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part3.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnHtml}
                  >
                    网页版
                  </a>
                  <a 
                    href="https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPdf}
                  >
                    PDF版
                  </a>
                </div>
              </div>
              {/* 新增Part3直接复制上面整套 courseCard 即可，布局自动适配三列 */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeworkSection}>
        <div className={styles.welcomeHW}>
        </div>
        <div className={styles.homeworkCardsWrap}>
          {/* Part 1 卡片 */}
          <div  className={styles.homeworkCard}
                onClick={() => openHomeworkPdf(
                  "https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework1.zip",
                  "hw1password" // 这张卡片独立密码，每张卡自己改
                )}>
            <div className={styles.HwCardImgBox}>
              <img 
                src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/hwCard.png" 
                alt="HW 封面"
              />
            </div>
            <div className={styles.HwCardText}>
              <h3>作业 1</h3>
              <h3>Homework 1</h3>
            </div>
          </div>
          {/* Part 2 卡片 */}
          <div  className={styles.homeworkCard}
                onClick={() => openHomeworkPdf(
                  "https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework2.zip",
                  "hw2password" // 这张卡片独立密码，每张卡自己改
                )}>
            <div className={styles.HwCardImgBox}>
              <img 
                src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/hwCard.png" 
                alt="HW 封面"
              />
            </div>
            <div className={styles.HwCardText}>
              <h3>作业 2</h3>
              <h3>Homework 2</h3>
            </div>
          </div>
          {/* Part 3 卡片 */}
          <div  className={styles.homeworkCard}
                onClick={() => openHomeworkPdf(
                  "https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework3.zip",
                  "hw3password" // 这张卡片独立密码，每张卡自己改
                )}>
            <div className={styles.HwCardImgBox}>
              <img 
                src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/hwCard.png" 
                alt="HW 封面"
              />
            </div>
            <div className={styles.HwCardText}>
              <h3>作业 3</h3>
              <h3>Homework 3</h3>
            </div>
          </div>
          {/* Part 4 卡片 */}
          <div  className={styles.homeworkCard}
                onClick={() => openHomeworkPdf(
                  "https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework4.zip",
                  "hw4password" // 这张卡片独立密码，每张卡自己改
                )}>
            <div className={styles.HwCardImgBox}>
              <img 
                src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/hwCard.png" 
                alt="HW 封面"
              />
            </div>
            <div className={styles.HwCardText}>
              <h3>作业 4</h3>
              <h3>Homework 4</h3>
            </div>
          </div>
          {/* Part 5 卡片 */}
          <div  className={styles.homeworkCard}
                onClick={() => openHomeworkPdf(
                  "https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework5.zip",
                  "hw5password" // 这张卡片独立密码，每张卡自己改
                )}>
            <div className={styles.HwCardImgBox}>
              <img 
                src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/hwCard.png" 
                alt="HW 封面"
              />
            </div>
            <div className={styles.HwCardText}>
              <h3>作业 5</h3>
              <h3>Homework 5</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.examsSection}>
        {/* 第一块：Practice Midterm */}
        <div className={styles.examRow}>
          <div className={styles.examImgBox}>
            <img src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/codingwithme3.jpg" alt="Practice Midterm Cover" />
          </div>
          <div className={styles.examText}>
            <h2>Practice Midterm</h2>
            <p>期中模拟练习题，覆盖课程前半段核心知识点。</p>
            <button 
              onClick={() => openExam("https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/practiceMidterm.zip", "practiceMidtermPassword")} // 这里替换为实际的OSS压缩包链接和密码
              className={styles.btnExam}
            >
              Download Exam
            </button>
          </div>
        </div>

        {/* 第二块：Practice Final */}
        <div className={styles.examRow}>
          <div className={styles.examText}>
            <h2>Practice Final</h2>
            <p>期末综合模拟套卷，整合全课程内容，适合考前整体复盘自测。</p>
            <button 
              onClick={() => openExam("https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/practiceFinal.zip", "practiceFinalPassword")} // 这里替换为实际的OSS压缩包链接和密码
              className={styles.btnExam}
            >
              Download Exam
            </button>
          </div>
          <div className={styles.examImgBox}>
            <img src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/bridge2.png" alt="Practice Final Cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RProgrammingHomePage;