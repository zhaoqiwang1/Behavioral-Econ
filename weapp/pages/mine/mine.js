import { userAPI } from '../../services/api.js'; 
const auth = require('../../utils/auth.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogged: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    auth.updateLastActivity();
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo'); // 改为 userInfo，且不解析
  
    // 如果 token 不存在或 userInfo 不是对象/没有 _id，视为未登录
    if (!token || !userInfo || typeof userInfo !== 'object' || !userInfo._id) {
      this.setData({
        isLogged: false,
        userInfo: {}
      });
      return;
    }
  
    // 直接使用 userInfo 对象
    this.setData({
      isLogged: true,
      userInfo: userInfo
    });
  },

  // 跳转到登录页面
  goToLogin: function() {
    wx.navigateTo({
      url: '../login/login'
    });
  },
  
  // 跳转到更新用户信息页面
  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 退出登录
  handleLogout: function() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo'); // 改为 userInfo
          wx.removeStorageSync('user'); // 如果之前有旧的可以一并清除
          this.setData({
            isLogged: false,
            userInfo: {}
          });
          wx.showToast({ title: '已退出', icon: 'success' });
        }
      }
    });
  }
  
})