// 这个 BrowserCloseHandler 组件是一个浏览器关闭/页面隐藏事件监听器，主要用于在用户离开页面时通知后端进行清理操作。
// 总结：这个组件就像是前端的"告别信使"，在用户离开时礼貌地通知后端："用户走了，你可以开始打扫房间了！" 🏠✨

// 这个 BrowserCloseHandler 组件是一个浏览器关闭/页面隐藏事件监听器，主要用于在用户离开页面时通知后端进行清理操作。
// 总结：这个组件就像是前端的"告别信使"，在用户离开时礼貌地通知后端："用户走了，你可以开始打扫房间了！" 🏠✨

import { useEffect } from 'react';

const BrowserCloseHandler = () => {
  useEffect(() => {
    const handleBeforeUnload = async () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (user && token) {
        try {
          const userData = JSON.parse(user); // 解析用户信息
          // 使用与你的api.js相同的环境判断逻辑
          const isProduction = process.env.NODE_ENV === 'production';
          const baseURL = isProduction 
            ? 'https://zhaoqiwangteaching.com/api' 
            : 'http://localhost:3001/api';
          
          // 发送到 users 路由下的 browser-close 端点
          await fetch(`${baseURL}/users/browser-close`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            userId: userData._id,     // 传递用户ID
            username: userData.username // 传递用户名
           })
          });
        } catch (error) {
          console.log('浏览器关闭信号已发送');
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};

export default BrowserCloseHandler;
