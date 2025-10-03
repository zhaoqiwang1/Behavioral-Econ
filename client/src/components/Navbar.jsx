// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('已退出登录');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title" onClick={() => navigate('/')}>
        首页
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          // 已登录状态
          <div className="user-info">
            <span>欢迎, {user?.username}</span>
            <button onClick={handleLogout} className="nav-btn logout-btn">
              登出
            </button>
          </div>
        ) : (
          // 未登录状态
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="nav-btn login-btn">
              登录
            </button>
            <button onClick={() => navigate('/register')} className="nav-btn register-btn">
              注册
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;