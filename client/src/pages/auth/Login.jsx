// Login.jsx - 登录页面
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';  // 新增导入
import styles from './Login.module.css';  
import Navbar from '../../components/Navbar.jsx';

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
      let errorMessage = "";
      if (errors.username) errorMessage += `• ${errors.username}\n`;
      if (errors.password) errorMessage += `• ${errors.password}\n`;
      // alert(errorMessage);
      toast.error(errorMessage);
      return;
    }

    // 调用登录API
    userAPI.login(loginData)
      .then((response) => {
        //alert("登录成功！");
        toast.success("登录成功！");
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
          // alert('服务器内部错误，请检查后端服务是否正常运行');
          toast.error('服务器内部错误，请检查后端服务是否正常运行');
        } else if (error.response?.status === 401) {
          // alert('用户名或密码错误');
          toast.error('用户名或密码错误');
        } else {
          // alert('登录失败，请稍后重试');
          toast.error('登录失败，请稍后重试');
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
    <div>
       <Navbar />
       <div className={styles.loginAppContainer}>
        <div className={styles.loginContainer}>
          <h1>请登录</h1>
          {/* 登录表单 */}
          <div className={styles.loginForm}>
            {/* 用户名输入 */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                用户名 *
              </label>
              <input 
                type="text" 
                placeholder="请输入用户名" 
                value={loginData.username}
                onChange={(event) => handleInputChange('username', event.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.loginFormInput}
              />
            </div>
            
            {/* 密码输入 */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                密码 *
              </label>
              <input 
                type="password" 
                placeholder="请输入密码" 
                value={loginData.password}
                onChange={(event) => handleInputChange('password', event.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.loginFormInput}
                />
            </div>
            
            {/* 登录按钮 */}
            <button onClick={handleLogin} className={styles.loginButton}>
              登录
            </button>
          </div>

          {/* 导航区域 */}
          <div className={styles.navigationSection}>
            {/* <p className={styles.navigationText}>还没有账号？</p> */}
            <div className={styles.buttonGroup}>
              <button 
                onClick={() => navigate('/auth/register')}
                className={`${styles.navButton} ${styles.registerButton}`}
              >
                注册账号
              </button>
              {/* <button 
                onClick={() => navigate('/')}
                className={`${styles.navButton} ${styles.homeButton}`}
              >
                回到主页
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;