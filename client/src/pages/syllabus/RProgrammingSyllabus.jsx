import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import BackToTop from '../../components/BackToTop.jsx';
import styles from './RProgrammingSyllabus.module.css';


export default function RProgrammingSyllabus() {

  return (
    <div>
      <Navbar />
      <BackToTop />
    <div className={styles.container}>
      {/* 头部课程信息 */}
      <header className={styles.header}>
        <h1>R Data Analysis</h1>
        <p className={styles.teacher}>Instructor：王兆祺 - Zhaoqi Wang</p>
        <p className={styles.dept}>Department of Finance, School of Economics, Jinan University</p>
        <p className={styles.email}>wzqteaching@gmail.com</p>
      </header>

      <main className={styles.content}>
        {/* 1. What is R */}
        <section className={styles.card}>
          <h2>What is R?</h2>
          <p>R is a powerful and open-source programming language and software environment specifically designed for statistical computing, data analysis, and graphical visualization. Widely used by statisticians, data scientists, and researchers, it offers a vast repository of packages (such as those in CRAN) that extend its functionality for specialized tasks like machine learning, bioinformatics, and financial modeling.</p>
        </section>

        {/* 2. The Advantages of R */}
        <section className={styles.card}>
          <h2>The Advantages of R</h2>
          <ul className={styles.list}>
            <li>Powerful statistical modeling and analysis packages (regression, time series, factor analysis, testing).</li>
            <li>High-quality visualization: ggplot2, plotly, echarts4r, suitable for publication-ready charts.</li>
            <li>Rapid prototyping and report automation: R Markdown / Quarto / Shiny.</li>
            <li>Rich ecosystem of academic and industry packages (biostatistics, econometrics, financial risk management, etc.).</li>
          </ul>
        </section>

        {/* 3. Typical Roles and Scenarios in Enterprises */}
        <section className={styles.card}>
          <h2>Typical Roles and Scenarios in Enterprises</h2>
          <ul className={styles.list}>
            <li>Internal analysts / data scientists: Metric definition, A/B testing analysis, model building.</li>
            <li>Business Intelligence (BI) and reporting: Automated weekly/monthly reports, KPI dashboards (for internal use).</li>
            <li>Risk management/Finance/Pharmaceutical industries: Statistical testing, clinical trial analysis, risk models.</li>
            <li>R output → Front-end/Product: Providing data via JSON/CSV or APIs (Plumber).</li>
            <li>Of Course, R is also extensively used in Academia.</li>
          </ul>
        </section>

        {/* 4. What Can R bring to Your Career? */}
        <section className={styles.card}>
          <h2>What Can R Bring to Your Career?</h2>
          <p>Data analysis & R skills are highly demanded in medicine, finance, internet industry. Job openings include data analyst, visualization engineer, BI developer etc.</p>
        </section>

        {/* 5. What Will We Learn From This Class? */}
        <section className={styles.card}>
          <h2>What Will We Learn From This Class?</h2>
              <div className={styles.cardImgBox}>
                <img 
                  src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rsyllabus1.png" 
                  alt="R syllabus pic 1"
                />
              </div>
          <p>See An R Markdown Example: <br />
            <a href="https://ilias.uni-marburg.de/data/UNIMR/lm_data/lm_2978812/unit01/unit01-08_Rmd_html.html#this-is-a-header" target="_blank" rel="noreferrer" className={styles.link}>
              https://ilias.uni-marburg.de/data/UNIMR/lm_data/lm_2978812/unit01/unit01-08_Rmd_html.html#this-is-a-header
            </a>
          </p>
        </section>

        {/* 6. Why Learn R in the Era of AI? */}
        <section className={styles.card}>
          <h2>Why Learn R in the Era of AI?</h2>
          <ul className={styles.list}>
            <li>AI can generate R code, but it cannot replace basic programming understanding. If you know nothing about programming, you may not even know what to ask the AI or how to describe your problem clearly.</li>
            <li>When something goes wrong, beginners often paste hundreds or thousands of lines of code into AI and ask it to “fix the bug.” In contrast, someone who understands R can quickly identify which function or step is causing the problem and ask the AI for a targeted solution. This makes the workflow much faster and more reliable.</li>
            <li>Understanding R also allows you to judge whether AI-generated code is correct. AI sometimes produces code that runs but gives the wrong result. Without programming knowledge, it is difficult to detect such mistakes.</li>
            <li>Programming literacy also helps you communicate with collaborators. In many research or industry projects, you will work with colleagues who write code. If you understand the basics, you can discuss data structures, models, and analysis pipelines more effectively.</li>
            <li>Most powerful data tools and software are still built by people who understand programming. AI helps accelerate development, but human users still design the analysis and guide the process.</li>
            <li>Learning R therefore is not just about writing code manually—it is about understanding how data analysis works so that you can use AI as a powerful assistant rather than relying on it blindly.</li>
          </ul>
        </section>

        {/* 7. Main Purpose of This Course */}
        <section className={styles.card}>
          <h2>Main Purpose of This Course</h2>
          <p>This course will teach students how to use R for data analysis. By using R, students will be able to uncover the truths behind the data. The course content mainly covers:</p>
          <ul className={styles.list}>
            <li>Basic R programming,</li>
            <li>R data cleaning,</li>
            <li>R data visualization,</li>
            <li>R regression analysis, and</li>
            <li>R Markdown.</li>
          </ul>
          <p>It includes common syntax required for completing data analysis tasks.</p>
        </section>

        {/* 8. Textbook */}
        <section className={styles.card}>
          <h2>Textbook</h2>
          <p>There is no specific textbook for this course; please refer to the PDF materials provided.</p>
        </section>

        {/* 9. Class Attendance */}
        <section className={styles.card}>
          <h2>Class Attendance</h2>
          <p>I will randomly select one class session to record your attendance. Therefore, it is highly recommended that you attend all classes.</p>
        </section>

        {/* 10. Homework Assignments */}
        <section className={styles.card}>
          <h2>Homework Assignments</h2>
          <ul className={styles.list}>
            <li>The best way to learn is to apply it in practice.</li>
            <li>Currently, there are a total of five homework assignments for this course.</li>
            <li>The grading of homework will primarily be based on your attitude towards completing the assignments rather than the correctness of your answers. Thus, no points will be deducted for incorrect answers.</li>
            <li>As long as you complete the homework carefully, you will usually receive a high score.</li>
            <li>The purpose of these homework assignments is to help you learn how to apply the knowledge you have acquired to conduct data analysis using R.</li>
            <li>Learning through summarizing and correcting mistakes is one of the fastest ways to make progress.</li>
          </ul>
        </section>

        {/* 11. Exams */}
        <section className={styles.card}>
          <h2>Exams</h2>
          <p>Midterm exam: There will be no formal midterm exam. However, we will have a midterm in-class practice session.</p>
          <p><strong>Final exam:</strong></p>
          <ul className={styles.list}>
            <li>The final exam must be completed using R.</li>
            <li>It will be an open-book exam, and the questions will mainly test your ability to apply the knowledge you have learned.</li>
            <li>You can use any method to complete the exam tasks, including reviewing PPT/PDF slides, referring to homework answers, or searching online.</li>
            <li>However, plagiarism and asking classmates for answers are strictly prohibited, and you are not allowed to use AI during the exam.</li>
            <li>The exam time will be sufficient but not excessive; therefore, your proficiency in R gained through regular homework completion will determine whether you can finish the exam within the specified time.</li>
            <li>Specific exam content: I will provide a dataset in advance, and you need to answer a number of questions related to this dataset.</li>
          </ul>
        </section>

        {/* 12. Grades */}
        <section className={styles.card}>
          <h2>Grades for This Course</h2>
          <p>The total score for this course is 100 points, which is composed of the following parts:</p>
          <ul className={styles.list}>
            <li>Final Exam: 60%</li>
            <li>Five Homework Assignments: 35% (Each assignment is worth 20 points, totaling 100 points for all five assignments)</li>
            <li>Attendance Score: 5%.</li>
          </ul>
          <p className={styles.formula}>
            <strong>Course Score Calculation Formula:</strong><br/>
            Score = 0.6 × Final Exam Score (out of 100 points) + <br/> 0.35 × Total Score of Five Homework Assignments (5 × 20 points = 100 points) + Attendance Score
          </p>
          <ul className={styles.list}>
            <li>Bonus Points: Active participation in asking and answering questions in our WeChat group can earn you additional points. The specific number of additional points has not been determined yet. Therefore, please make sure to note your full name and student ID in the WeChat group.</li>
          </ul>
        </section>

        {/* 13. Class Schedules Table */}
        <section className={styles.card}>
          <h2>Class Schedules</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Weeks</th>
                  <th>Materials</th>
                  <th>Data Used</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Week 1.</td><td>Course Introduction + R Programming Basics. Part 1</td><td>--</td></tr>
                <tr><td>Week 2.</td><td>R Programming Basics. Part 2 + Homework Assignment 1</td><td>--</td></tr>
                <tr><td>Week 3.</td><td>R Data Visualization. Part 1</td><td>cars.csv</td></tr>
                <tr><td>Week 4.</td><td>R Data Visualization. Part 2</td><td>cars.csv</td></tr>
                <tr><td>Week 5.</td><td>R Data Visualization. Part 3 + Homework Assignment 2</td><td>mpg and economics in ggplot2</td></tr>
                <tr><td>Week 6.</td><td>R Data Cleaning. Part 1</td><td>cars.csv, state_water_phdi.csv</td></tr>
                <tr><td>Week 7.</td><td>R Data Cleaning. Part 2</td><td>starwars in dplyr</td></tr>
                <tr><td>Week 8.</td><td>R Data Cleaning. Part 3 + Homework Assignment 3</td><td>time_data.csv</td></tr>
                <tr><td>Week 9.</td><td>Midterm In-class Practice</td><td>--</td></tr>
                <tr><td>Week 10.</td><td>Regression in R. Part 1</td><td>Prestige, unions.csv</td></tr>
                <tr><td>Week 11.</td><td>Regression in R. Part 2</td><td>mpg, starwars, apple_data.csv</td></tr>
                <tr><td>Week 12.</td><td>Regression in R. Part 3 + Homework Assignment 4</td><td>Prestige, unions.csv</td></tr>
                <tr><td>Week 13.</td><td>R markdown. Part 1</td><td>--</td></tr>
                <tr><td>Week 14.</td><td>R markdown. Part 2 + Homework Assignment 5</td><td>Prestige</td></tr>
                <tr><td>Week 15.</td><td>R markdown. Part 3</td><td>Prestige, apple.csv, tesla.csv</td></tr>
                <tr><td>Week 16.</td><td>Final In-class Practice</td><td>--</td></tr>
              </tbody>
            </table>
          </div>
          <p className={styles.downloadLink}>R download：
            <a href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noreferrer" className={styles.link}>
              https://posit.co/download/rstudio-desktop/
            </a>
          </p>
        </section>
      </main>
    </div>
  </div>
  )
}