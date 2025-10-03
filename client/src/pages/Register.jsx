// Register.jsx - 注册页面
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import './Register.css'

const Register = () => {
  // const [listOfUsers, setlistOfUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "", 
    password: "",
    confirmPassword: "",
    demographic: {
      age: "",
      gender: "",
      education: ""
    }
  });
  // const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // 更新表单字段的通用函数
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 更新 demographic 字段
  const handleDemographicChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      demographic: {
        ...prev.demographic,
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    // 用户名验证
    if (!formData.username.trim()) {
      errors.username = "用户名是必填的";
    } else if (formData.username.length < 3) {
      errors.username = "用户名至少3个字符";
    }
    
    // 邮箱验证
    if (!formData.email.trim()) {
      errors.email = "邮箱是必填的";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "请输入有效的邮箱地址";
    }
    
    // 密码验证
    if (!formData.password) {
      errors.password = "密码是必填的";
    } else if (formData.password.length < 6) {
      errors.password = "密码至少6个字符";
    }
    
    // 确认密码验证
    if (!formData.confirmPassword) {
      errors.confirmPassword = "请确认密码";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "两次输入的密码不一致";
    }

    // Demographic 信息验证（必填）
    if (!formData.demographic.age) {
      errors.age = "年龄是必填的";
    } else if (formData.demographic.age < 18) {
      errors.age = "年龄必须大于18岁";
    } else if (formData.demographic.age > 100) {
      errors.age = "请输入有效的年龄";
    }
    
    if (!formData.demographic.gender) {
      errors.gender = "性别是必填的";
    }
    
    if (!formData.demographic.education) {
      errors.education = "学历是必填的";
    }
    
    // setFormErrors(errors);
    return errors;
  };


  // 注册用户
  const handleRegister = () => {
    const errors = validateForm(); // ✅ 获取返回的 errors
      
    if (Object.keys(errors).length > 0) {
        alert('当前错误状态: ' + JSON.stringify(errors, null, 2));
        return;
    }


    // 准备发送给后端的数据
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      age: parseInt(formData.demographic?.age) || 0, // 直接放在根级别
      gender: formData.demographic?.gender || '',    // 直接放在根级别
      education: formData.demographic?.education || '' // 直接放在根级别
    };
    // console.log('发送的数据:', userData);

    userAPI.register(userData)
      .then((response) => {
        alert("注册成功！");
        // 清空表单
        setFormData({
          username: "",
          email: "", 
          password: "",
          confirmPassword: "",
          demographic: {
            age: "",
            gender: "",
            education: ""
          }
        });

        // 跳转到登录页面或首页
        navigate('/login');
        
      }).catch((error) => {
        console.error('注册失败:', error);
        alert(`注册失败: ${error.response?.data?.message || error.message}`);
      });
  };

  return (
    <div className="register-app-container">
      <div className="register-container">
        {/* <h1>用户注册</h1> */}
        
        {/* 注册表单 */}
        <div className="register-form">
          <h2>填写注册信息</h2>
          
          {/* 基础信息 */}
          <div className="form-row">
            <input 
              type="text" 
              placeholder="用户名" 
              value={formData.username}
              onChange={(event) => handleInputChange('username', event.target.value)}
              className="register-form-input"
            />
          </div>
          
          <div className="form-row">
            <input 
              type="email" 
              placeholder="邮箱地址" 
              value={formData.email}
              onChange={(event) => handleInputChange('email', event.target.value)}
              className="register-form-input"
            />
          </div>
          
          <div className="form-row">
            <input 
              type="password" 
              placeholder="密码" 
              value={formData.password}
              onChange={(event) => handleInputChange('password', event.target.value)}
              className="register-form-input"
            />
          </div>
          
          <div className="form-row">
            <input 
              type="password" 
              placeholder="请再次输入密码" 
              value={formData.confirmPassword}
              onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
              className="register-form-input"
            />
          </div>

          {/* Demographic 信息 */}
          <h3>个人信息</h3>
          
          <div className="form-row">
            <input 
              type="number" 
              placeholder="年龄" 
              value={formData.demographic.age}
              onChange={(event) => handleDemographicChange('age', event.target.value)}
              className="register-form-input"
            />
          </div>
          
          <div className="form-row">
            <select 
              value={formData.demographic.gender}
              onChange={(event) => handleDemographicChange('gender', event.target.value)}
              className="form-select"
            >
              <option value="">选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          
          <div className="form-row">
            <select 
              value={formData.demographic.education}
              onChange={(event) => handleDemographicChange('education', event.target.value)}
              className="form-select"
            >
              <option value="">选择学历</option>
              <option value="本科">本科</option>
              <option value="研究生">研究生</option>
              <option value="博士生">博士生</option>
            </select>
          </div>
        
          <button 
          onClick={handleRegister}
          className="register-button"
        >
          注册
        </button>

        </div>
      </div>
    </div>
  );
}

export default Register;