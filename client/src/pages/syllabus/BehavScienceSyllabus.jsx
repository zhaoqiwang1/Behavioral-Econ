import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import BackToTop from '../../components/BackToTop.jsx';
import styles from './BehavScienceSyllabus.module.css';

export default function BehavScienceSyllabus() {
  return (
    <div>
      <Navbar />
      <BackToTop />
      <div className={styles.container}>
        {/* 头部课程信息 */}
        <header className={styles.header}>
          <h1>行为经济学</h1>
          <p className={styles.teacher}>授课教师：王兆祺</p>
          <p className={styles.dept}>暨南大学, 经济学院</p>
          <p className={styles.email}>wzqteaching@gmail.com</p>
        </header>

        <main className={styles.content}>
          {/* 1. 课程主旨 */}
          <section className={styles.card}>
            <h2>课程主旨</h2>
            <p>本课程将带领大家在实验室场景下研究经济、金融相关问题。完成本课程学习后，你将掌握三大核心内容：</p>
            <ul className={styles.list}>
              <li>全面了解行为与实验经济金融领域，熟悉主流研究方向、经典实验设计以及代表性研究结论。</li>
              <li>设计严谨的实验室实验，用于探究个体经济决策行为，并以标准化、科学的方式采集实验数据。</li>
              <li>使用R语言分析实验数据，得出可靠的经济学结论（实践是最好的学习方式，在实操中掌握数据分析）。</li>
            </ul>
          </section>

          {/* 2. 教材说明 */}
          <section className={styles.card}>
            <h2>教材</h2>
            <p>本课程无指定教材，全部核心知识点都会在老师提供的PPT课件中讲解。</p>
            <p className={styles.note}>课余可自行阅读、购买行为金融学、行为经济学、实验金融学、实验经济学相关书籍拓展学习。</p>
          </section>

          {/* 3. 课程内容整体安排 */}
          <section className={styles.card}>
            <h2>课程内容整体安排</h2>
            <p>课程由三大模块组成：行为与实验经济学文献研读、课堂互动实验、R语言数据分析实操。</p>
            <ul className={styles.list}>
              <li>单数周：理论知识、学术文献阅读 + 课堂实验。</li>
              <li>双数周：R编程与实验数据分析。<strong>上课务必携带笔记本电脑，跟随课堂同步实操代码。</strong></li>
            </ul>
          </section>

          {/* 4. 上课签到规则 */}
          <section className={styles.card}>
            <h2>上课签到规则</h2>
            <p>日常课程不强制点名，课程尊重大家的个人时间安排。</p>
            <p>签到分数将由随机抽取一次课堂实验的表现来判定。</p>
            {/* <p className={styles.note}>文献课会完整演示标准实验设计与数据分析思路，是作业和期末论文的重要参考，建议尽量全程出勤。</p> */}
          </section>

          {/* 5. 作业安排 */}
          <section className={styles.card}>
            <h2>作业安排</h2>
            <ul className={styles.list}>
              <li>本学期共布置4次课程作业。</li>
              <li>作业评分重点看完成态度，不会因答案错误扣分，认真完成即可拿到高分。</li>
              <li>作业内容与课堂论文紧密结合：使用R分析课堂实验游戏中的决策数据，挖掘原始数据背后隐藏的行为规律。</li>
              <li><strong>任何原因导致的迟交作业，一律不予接收。</strong></li>
            </ul>
          </section>

          {/* 6. 期末考核：小组课程论文 */}
          <section className={styles.card}>
            <h2>期末考核：小组课程论文</h2>
            <p>全体同学以小组形式完成课程论文，分组要求：</p>
            <ul className={styles.list}>
              <li>每组4–5人，自行推选一名组长。</li>
              <li>研究课题必须与行为经济学、行为金融学相关，选题无关会大幅扣分。</li>
              <li>可用数据来源：自主设计问卷、线下实验、网络爬虫数据或公开现有数据集。</li>
            </ul>
            <p>所有小组需要将选定课题登记在共享Excel文档中，先到先得，避免选题重复。</p>
            <p>完整论文必须包含以下板块，全文总字数不少于4000字：</p>
            <ol className={styles.list}>
              <li>具体研究问题</li>
              <li>选题背景</li>
              <li>选题意义</li>
              <li>相关文献（至少30篇参考文献）</li>
              <li>研究假设</li>
              <li>实验/问卷设计</li>
              <li>数据分析</li>
              <li>研究结论</li>
            </ol>
            <p className={styles.note}>论文截止提交时间、格式规范后续统一通知。</p>
            <p>小组计分规则：</p>
            <ul className={styles.list}>
              <li>每组提交成员贡献占比表，每位同学最终分数会根据贡献比例上下浮动。</li>
              <li>无特殊说明时，默认全体组员贡献均等。</li>
              <li>可向指定邮箱提交组员匿名互评，互评结果将作为最终打分参考依据。</li>
            </ul>
          </section>

          {/* 7. 总成绩计分规则 */}
          <section className={styles.card}>
            <h2>总成绩计分规则（满分100分）</h2>
            <div className={styles.formula}>
              <ul className={styles.list}>
                <li>期末小组论文：60分（占比60%）</li>
                <li>4次作业：每次7.5分，合计30分（占比30%）</li>
                <li>课堂实验表现分：10分（占比10%）</li>
              </ul>
            </div>
            <p>10分实验表现分计算规则：</p>
            <p>本学期共开展6次课堂实验，老师将随机抽取其中一次实验计算你的得分：</p>
            <p className={styles.highlightText}>实验得分 = 10 ×（个人游戏得分 ÷ 100）</p>
            <p className={styles.note}>每一次课堂实验都需要认真参与；无提前请假缺课，本次实验直接记0分，仅提前报备请假有效。</p>
          </section>

          {/* 8. 每周课程安排表 */}
          <section className={styles.card}>
            <h2>每周课程安排表</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>周序</th>
                    <th>主要教学内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>第1周</td><td>课程大纲介绍 + 实验经济学发展简史</td></tr>
                  <tr><td>第2周</td><td>R语言数据分析（一）</td></tr>
                  <tr><td>第3周</td><td>实验研究方法入门</td></tr>
                  <tr><td>第4周</td><td>R语言数据分析（二）</td></tr>
                  <tr><td>第5周</td><td>信念更新的实验室测量</td></tr>
                  <tr><td>第6周</td><td>R语言数据分析（三）</td></tr>
                  <tr><td>第7周</td><td>风险偏好、模糊偏好、过度自信</td></tr>
                  <tr><td>第8周</td><td>R语言数据分析（四）</td></tr>
                  <tr><td>第9周</td><td>非贝叶斯决策理论（一）</td></tr>
                  <tr><td>第10周</td><td>R语言数据分析（五）</td></tr>
                  <tr><td>第11周</td><td>非贝叶斯决策理论（二）</td></tr>
                  <tr><td>第12周</td><td>R语言数据分析（六）</td></tr>
                  <tr><td>第13周</td><td>情绪与个体决策行为</td></tr>
                  <tr><td>第14周</td><td>R语言数据分析（七）</td></tr>
                  <tr><td>第15周</td><td>身份认同与社会规范</td></tr>
                  <tr><td>第16周</td><td>R语言数据分析（八）</td></tr>
                </tbody>
              </table>
            </div>
            <p className={styles.downloadLink}>R与RStudio下载地址：
              <a href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noreferrer" className={styles.link}>
                https://posit.co/download/rstudio-desktop/
              </a>
            </p>
            <p className={styles.note}>请同学们课前提前在笔记本电脑安装好R和RStudio软件。</p>
          </section>
        </main>
      </div>
    </div>
  )
}
