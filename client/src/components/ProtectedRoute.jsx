// src/components/ProtectedRoute.jsx

/**
 * 🔐 路由保护组件 - 安全守卫
 * 
 * 🎯 这个组件的作用：
 * 就像商场的VIP区域，只有持卡会员（已登录用户）才能进入
 * 非会员（未登录用户）会被自动请到前台（登录页）
 * 
 * 💡 当前项目状态：
 * - 目前我们主要使用【按钮级别】的保护（checkAuthAndNavigate函数）
 * - 这个ProtectedRoute组件已经创建，但尚未在App.js中启用
 * - 你可以根据需要决定是否使用路由级别的保护
 * 
 * 🆚 两种保护方式的区别：
 * 
 * 【按钮级别保护】（当前使用中）
 * ✅ 优点：用户体验友好，点击按钮时给出明确提示
 * ❌ 缺点：用户直接输入网址可以绕过保护
 * 📍 使用场景：主页上的功能按钮
 * 
 * 【路由级别保护】（这个组件）
 * ✅ 优点：绝对安全，任何方式都无法绕过
 * ✅ 优点：统一的保护逻辑，不需要每个按钮单独处理
 * ❌ 缺点：用户可能困惑为什么突然跳转到登录页
 * 📍 使用场景：需要绝对安全的页面（个人中心、支付页面等）
 * 
 * 🚀 如何使用：
 * 1. 在App.js中导入这个组件
 * 2. 用<ProtectedRoute>包裹需要保护的页面组件
 * 
 * 示例：
 * <Route path="/risk-attitude-elicit" element={
 *   <ProtectedRoute>
 *     <RiskAttitudePage />
 *   </ProtectedRoute>
 * } />
 * 
 * 📝 注意：启用路由保护后，可以移除按钮上的checkAuthAndNavigate调用
 * 因为路由保护会在进入页面时自动检查，更加安全和简洁！
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 注意路径可能不同
import styles from './ProtectedRoute.module.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>验证中...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;