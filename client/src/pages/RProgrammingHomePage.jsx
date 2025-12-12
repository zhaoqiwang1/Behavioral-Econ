// RProgrammingHomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar.jsx';

const RProgrammingHomePage = () => {
  return (
    <div>
       <Navbar />
       <div>
        <h1>R语言课程正在开发中...</h1>
       </div>
        <p>
          <a href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.html" target="_blank" rel="noopener noreferrer">Basics_Part1（HTML版）</a>
          <a href="https://zhaoqiwang1.github.io/Basics_Part1/Basics_1.pdf" target="_blank" rel="noopener noreferrer" download>下载 PDF 版</a>
        </p>
    </div>
  );
};

export default RProgrammingHomePage;