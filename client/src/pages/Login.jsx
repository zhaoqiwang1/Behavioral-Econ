// Login.jsx - 登录页面
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext.jsx';  // 新增导入
import './Login.css';  

const Login = () => {
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  const navigate = useNavigate();

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 登录验证
  const validateLogin = () => {
    const errors = {};
    
    if (!loginData.username.trim()) {
      errors.username = "用户名是必填的";
    } else if (loginData.username.length < 3) {
      errors.username = "用户名至少3个字符";
    }
    
    if (!loginData.password) {
      errors.password = "密码是必填的";
    } else if (loginData.password.length < 6) {
      errors.password = "密码至少6个字符";
    }
    
    return errors;
  };

  // 登录处理
  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateLogin();
    
    if (Object.keys(errors).length > 0) {
      let errorMessage = "请修正以下错误：\n\n";
      if (errors.username) errorMessage += `• ${errors.username}\n`;
      if (errors.password) errorMessage += `• ${errors.password}\n`;
      alert(errorMessage);
      return;
    }

    // 调用登录API
    userAPI.login(loginData)
      .then((response) => {
        alert("登录成功！");
        // 保存登录状态
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        
        console.log(response);
        // 更新全局状态
        login(response.data.user);

        // 跳转主页
        navigate('/');
      })
      .catch((error) => {
        console.error('登录详细错误:', error);
        if (error.response?.status === 500) {
          alert('服务器内部错误，请检查后端服务是否正常运行');
        } else if (error.response?.status === 401) {
          alert('用户名或密码错误');
        } else {
          alert('登录失败，请稍后重试');
        }
      });
  };

  // 处理回车键登录
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-app-container">
      <div className="login-container">
        <h1>请登录</h1>
        {/* 登录表单 */}
        <div className="login-form">
          {/* 用户名输入 */}
          <div className="form-group">
            <label className="form-label">
              用户名 *
            </label>
            <input 
              type="text" 
              placeholder="请输入用户名" 
              value={loginData.username}
              onChange={(event) => handleInputChange('username', event.target.value)}
              onKeyPress={handleKeyPress}
              className="login-form-input"
            />
          </div>
          
          {/* 密码输入 */}
          <div className="form-group">
            <label className="form-label">
              密码 *
            </label>
            <input 
              type="password" 
              placeholder="请输入密码" 
              value={loginData.password}
              onChange={(event) => handleInputChange('password', event.target.value)}
              onKeyPress={handleKeyPress}
              className="login-form-input"
              />
          </div>
          
          {/* 登录按钮 */}
          <button onClick={handleLogin} className="login-button">
            登录
          </button>
        </div>

        {/* 导航区域 */}
        <div className="navigation-section">
          {/* <p className="navigation-text">还没有账号？</p> */}
          <div className="button-group">
            <button 
              onClick={() => navigate('/register')}
              className="nav-button register-button"
            >
              注册账号
            </button>
            {/* <button 
              onClick={() => navigate('/')}
              className="nav-button home-button"
            >
              回到主页
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;