// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // alert('已退出登录');
    toast.success('已退出登录');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/auth/settings'); // 跳转到用户设置页面
  };

  return (
    <nav className={styles.navbar}>
       <span className={styles.navbarTitle} onClick={() => navigate('/')}>
        首页
      </span>

      <div className={styles.courseNav}>
        <span onClick={() => navigate('/courses/behavioral-science')}>行为经济学</span>
        <span onClick={() => navigate('/courses/logic')}>逻辑学</span>
        <span onClick={() => navigate('/courses/r-programming')}>R语言</span>
      </div>

      <div className={styles.navbarRight}>
        {isAuthenticated ? (
          // 已登录状态
          <div className={styles.userInfo}>
            <span 
              className={styles.username} 
              onClick={handleProfileClick}
            >
              欢迎, {user?.username}
            </span>
            <span onClick={handleLogout} className={styles.navBtn}>
              登出
            </span>
          </div>
        ) : (
          // 未登录状态
          <div className={styles.authButtons}>
            <span onClick={() => navigate('/auth/login')} className={styles.navBtn}>
              登录
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;