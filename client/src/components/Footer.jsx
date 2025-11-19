import React from 'react';
import styles from './Footer.module.css'; // 可选的 CSS 模块

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2025 王兆祺的教学平台 - 致力于为学生提供优质的学习体验 版权所有 

       <a href="mailto:wzqbewater@gmail.com">
        <span> 联系方式 </span>
       </a>
      </p>
    </footer>
  );
};

export default Footer;