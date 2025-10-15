// src/pages/UserSettings.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from './UserSettings.module.css';

const UserSettings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    studentid: '',
    age: '',
    gender: '',
    education: ''
  });

  // 组件加载时从数据库获取最新用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) {
        setFetching(false);
        return;
      }

      try {
        const response = await userAPI.getUserProfile(user._id);
        
        if (response.status === 200) {
          const userData = response.data.user;
          setDbUser(userData);
          
          // 使用数据库中的数据填充表单
          setFormData({
            username: userData.username || '',
            email: userData.email || '',
            studentid: userData.demographic?.studentid || '',
            age: userData.demographic?.age || '',
            gender: userData.demographic?.gender || '',
            education: userData.demographic?.education || ''
          });
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
        // alert('获取用户信息失败，请刷新页面重试');
        toast.error('获取用户信息失败，请刷新页面重试');
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [user?._id]);

  const handleChange = (e) => {
    if (!isEditing) return;
    
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    if (dbUser) {
      setFormData({
        username: dbUser.username || '',
        email: dbUser.email || '',
        studentid: dbUser.demographic?.studentid || '',
        age: dbUser.demographic?.age || '',
        gender: dbUser.demographic?.gender || '',
        education: dbUser.demographic?.education || ''
      });
    }
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;
    
    setLoading(true);

    try {
      const response = await userAPI.updateProfile(user._id, formData);
      
      if (response.status === 200) {
        updateUser(response.data.user);
        setDbUser(response.data.user);
        setIsEditing(false);
        // alert('资料更新成功！');
        toast.success('资料更新成功！');
      }
    } catch (error) {
      console.error('更新失败:', error);
      // alert(error.response?.data?.message || '更新失败，请重试');
      toast.error(error.response?.data?.message || '更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getCurrentValue = (field) => {
    if (!dbUser) return '加载中...';
    
    switch(field) {
      case 'username':
        return dbUser.username || '未设置';
      case 'email':
        return dbUser.email || '未设置';
      case 'studentid':
        return dbUser.demographic?.studentid || '未设置';
      case 'age':
        return dbUser.demographic?.age ? `${dbUser.demographic.age}岁` : '未设置';
      case 'gender':
        return dbUser.demographic?.gender || '未设置';
      case 'education':
        return dbUser.demographic?.education || '未设置';
      default:
        return '未设置';
    }
  };

  if (!user || fetching) {
    return (
      <div>
        <Navbar />
        <div className={styles.loading}>加载用户信息中...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h1>账号信息</h1>
        </div>

        {!isEditing ? (
          // 查看模式
          <div className={styles.viewMode}>
            <div className={styles.section}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>用户名:</span>
                <span className={styles.infoValue}>{getCurrentValue('username')}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>邮箱:</span>
                <span className={styles.infoValue}>{getCurrentValue('email')}</span>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>学号:</span>
                <span className={styles.infoValue}>{getCurrentValue('studentid')}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>年龄:</span>
                <span className={styles.infoValue}>{getCurrentValue('age')}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>性别:</span>
                <span className={styles.infoValue}>{getCurrentValue('gender')}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>学历:</span>
                <span className={styles.infoValue}>{getCurrentValue('education')}</span>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                返回
              </button>
              <button 
                type="button" 
                onClick={handleStartEditing}
                className={styles.editButton}
              >
                开始编辑
              </button>
            </div>
          </div>
        ) : (
          // 编辑模式 - 改为水平布局
          <form onSubmit={handleSubmit} className={styles.editMode}>
            <div className={styles.section}>
              <div className={styles.editRow}>
                <label className={styles.editLabel}>用户名:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={styles.editInput}
                  required
                />
              </div>
              
              <div className={styles.editRow}>
                <label className={styles.editLabel}>邮箱:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.editInput}
                  required
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.editRow}>
                <label className={styles.editLabel}>学号:</label>
                <div className={styles.editInputContainer}>
                  <input
                    type="text"
                    name="studentid"
                    value={formData.studentid}
                    onChange={handleChange}
                    className={styles.editInput}
                  />
                </div>
              </div>

              <div className={styles.editRow}>
                <label className={styles.editLabel}>年龄:</label>
                <div className={styles.editInputContainer}>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={styles.editInput}
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div className={styles.editRow}>
                <label className={styles.editLabel}>性别:</label>
                <div className={styles.editInputContainer}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={styles.editSelect}
                  >
                    <option value="">请选择性别</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
              </div>

              <div className={styles.editRow}>
                <label className={styles.editLabel}>学历:</label>
                <div className={styles.editInputContainer}>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={styles.editSelect}
                  >
                    <option value="">请选择学历</option>
                    <option value="本科生">本科生</option>
                    <option value="研究生">研究生</option>
                    <option value="博士生">博士生</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={handleCancelEditing}
                className={styles.cancelButton}
              >
                取消编辑
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? '更新中...' : '保存更改'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSettings;