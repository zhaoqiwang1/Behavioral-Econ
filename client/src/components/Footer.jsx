import React from 'react';
import styles from './Footer.module.css'; // 可选的 CSS 模块

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2026 王兆祺的教学平台 - 致力于为学生提供优质的学习体验 版权所有 

      <a href="mailto:wzqbewater@gmail.com">
       <span> 联系方式 </span>
      </a>
      <br />
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        粤ICP备2026027916号-1
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src="https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/police_logo.png"
        width="17"
        style={{ position: "relative", top: "3px" }} 
        alt="公安备案"
      />
      &nbsp;
      <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" rel="noopener noreferrer">
      粤公网安备44011302005363号
      </a>
      </p>
    </footer>
  );
};

export default Footer;