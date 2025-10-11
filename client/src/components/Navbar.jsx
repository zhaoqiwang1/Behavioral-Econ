// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('已退出登录');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTitle} onClick={() => navigate('/')}>
        首页
      </div>

      <div className={styles.navbarRight}>
        {isAuthenticated ? (
          // 已登录状态
          <div className={styles.userInfo}>
            <span>欢迎, {user?.username}</span>
            <button onClick={handleLogout} className={`${styles.navBtn} ${styles.logoutBtn}`}>
              登出
            </button>
          </div>
        ) : (
          // 未登录状态
          <div className={styles.authButtons}>
            <button onClick={() => navigate('/login')} className={`${styles.navBtn} ${styles.loginBtn}`}>
              登录
            </button>
            <button onClick={() => navigate('/register')} className={`${styles.navBtn} ${styles.registerBtn}`}>
              注册
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;