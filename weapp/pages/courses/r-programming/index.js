const { downloadAndShare } = require('../../../utils/download.js');

Page({
  data: {
    modules: [
      {
        id: 'basics',
        name: 'R Basics',
        sub: '基础入门',
        parts: [
          {
            title: 'Part 1',
            desc: '安装、界面、变量、数据类型、运算、条件、循环、函数',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/more_analysis.jpg',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Basics_1.pdf'
          },
          {
            title: 'Part 2',
            desc: '向量、列表、矩阵、数据框、数据导入导出',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/ok.jpg',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Basics_2.pdf'
          }
        ]
      },
      {
        id: 'plot',
        name: 'Data Visualization',
        sub: '数据可视化',
        parts: [
          {
            title: 'Part 1',
            desc: '散点图、饼图、条形图、直方图、密度图，参数设置',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/dtaVisualization1.jpg',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Plot_Part1.pdf'
          },
          {
            title: 'Part 2',
            desc: '图例定制、多图矩阵、图形叠加、箱线图、CDF 图',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/dtaVisualization3.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Plot_Part2.pdf'
          },
          {
            title: 'Part 3',
            desc: 'ggplot2 全面应用，主题、时间序列、标注、美化',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/ok.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Plot_Part3.pdf'
          }
        ]
      },
      {
        id: 'cleaning',
        name: 'Data Cleaning',
        sub: '数据清洗',
        parts: [
          {
            title: 'Part 1',
            desc: '数据读取、缺失值处理、异常值清洗',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning3.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part1.pdf'
          },
          {
            title: 'Part 2',
            desc: 'dplyr 管道操作、分组统计、行列合并',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning2.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part2.pdf'
          },
          {
            title: 'Part 3',
            desc: 'lubridate 时间处理、stringr 字符串清洗',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/cleaning1.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Data_Cleaning_Part3.pdf'
          }
        ]
      },
      {
        id: 'regression',
        name: 'Regression Analysis',
        sub: '回归分析',
        parts: [
          {
            title: 'Part 1',
            desc: '线性回归建模与诊断，分类变量、交互项',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression1.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Regression_Part1.pdf'
          },
          {
            title: 'Part 2',
            desc: 'Logit 模型、多项式回归、Bootstrap 自助法',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression2.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Regression_Part2.pdf'
          },
          {
            title: 'Part 3',
            desc: 'stargazer / modelsummary / huxtable 输出 Word 表格',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/regression3.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Regression_Part3.pdf'
          }
        ]
      },
      {
        id: 'markdown',
        name: 'R Markdown',
        sub: '分析报告',
        parts: [
          {
            title: 'Part 1',
            desc: '基础语法、代码块控制、图片插入、gridExtra 组合图',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown1.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part1.pdf'
          },
          {
            title: 'Part 2',
            desc: 'LaTeX 公式、表格、BibTeX 文献引用',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown2.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part2.pdf'
          },
          {
            title: 'Part 3',
            desc: '交互式可视化：3D 散点、DT 表格、时间序列',
            img: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/rmarkdown3_1.png',
            pdfUrl: 'https://oss.zhaoqiwangteaching.com/RClass/Markdown_Part3.pdf'
          }
        ]
      }
    ],
    homework: [
      { id: 'hw1', title: 'Homework 1', url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework1.zip' },
      { id: 'hw2', title: 'Homework 2', url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework2.zip' },
      { id: 'hw3', title: 'Homework 3', url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework3.zip' },
      { id: 'hw4', title: 'Homework 4', url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework4.zip' },
      { id: 'hw5', title: 'Homework 5', url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Homework5.zip' }
    ],
    exams: [
      {
        id: 'midterm',
        title: 'Practice Midterm',
        desc: '期中模拟练习题，覆盖课程前半段核心知识点。',
        cover: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/codingwithme3.jpg',
        url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/practiceMidterm.zip'
      },
      {
        id: 'final',
        title: 'Practice Final',
        desc: '期末综合模拟套卷，整合全课程内容，适合考前整体复盘自测。',
        cover: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/bridge2.png',
        url: 'https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/practiceFinal.zip'
      }
    ]
  },

  // 下载 PDF
  downloadPDF(e) {
    const url = e.currentTarget.dataset.url;
    downloadAndShare(url, 'document.pdf');
  },

  downloadSyllabus() {
    downloadAndShare('https://oss.zhaoqiwangteaching.com/RClass/Syllabus.pdf', 'Syllabus.pdf');
  },

  downloadData() {
    downloadAndShare('https://zhaoqiwangteaching-images.oss-cn-guangzhou.aliyuncs.com/RClass/Data.zip', 'Data.zip');
  },

  downloadHomework(e) {
    const item = e.currentTarget.dataset.item;
    downloadAndShare(item.url, item.title + '.zip');
  },

  downloadExam(e) {
    const item = e.currentTarget.dataset.item;
    downloadAndShare(item.url, item.title + '.zip');
  }
});