// HtmlViewer.jsx
import React, { useEffect, useState } from 'react';

const HtmlViewer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 方法B：从公共文件夹加载，使用正确的路径
    fetch('/RMarkdown/Basics_1.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        setHtmlContent(html);
        setLoading(false);
      })
      .catch(error => {
        console.error('加载HTML文件失败:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>正在加载R Markdown报告...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>加载报告失败: {error.message}</p>
        <p>请确认文件路径: <code>/RMarkdown/Basics_1.html</code> 是否正确</p>
      </div>
    );
  }

  return (
    <div 
      className="rmd-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HtmlViewer;