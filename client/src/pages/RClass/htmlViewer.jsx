// HtmlViewer.jsx
import React from 'react';

const HtmlViewer = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="/RMarkdown/Basics_1.html"
        title="R Markdown 报告"
        width="100%"
        height="100%"
        style={{ 
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
};

export default HtmlViewer;