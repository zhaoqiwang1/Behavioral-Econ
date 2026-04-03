import { userAPI } from '../../services/api.js'; 

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
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    let userStr = wx.getStorageSync('user');
    
    // 确保 userStr 是字符串，如果不是则跳转到未登录状态
    if (typeof userStr !== 'string' || !token) {
      this.setData({
        isLogged: false,
        userInfo: {}
      });
      return;
    }

    try {
      // 确保 userStr 是一个有效的 JSON 字符串
      const userData = JSON.parse(userStr);
      
      this.setData({
        isLogged: true,
        userInfo: userData
      });
    } catch (error) {
      console.error('用户数据解析失败:', error);
      // 解析失败，清除无效数据
      wx.removeStorageSync('token');
      wx.removeStorageSync('user');
      
      this.setData({
        isLogged: false,
        userInfo: {}
      });
    }
  },

  // 跳转到登录页面
  goToLogin: function() {
    wx.navigateTo({
      url: '../login/login'
    });
  },

  // 退出登录
  handleLogout: function() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');
          
          // 更新页面状态
          this.setData({
            isLogged: false,
            userInfo: {}
          });
          
          wx.showToast({
            title: '已退出',
            icon: 'success'
          });
        }
      }
    });
  }
})