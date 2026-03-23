import React from 'react';
import styles from './Footer.module.css'; // 可选的 CSS 模块

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2026 王兆祺的教学平台 - 致力于为学生提供优质的学习体验 版权所有 

       <a href="mailto:wzqbewater@gmail.com">
        <span> 联系方式 </span>
       </a>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        粤ICP备2026027916号-1
       </a>
      </p>
    </footer>
  );
};

export default Footer;