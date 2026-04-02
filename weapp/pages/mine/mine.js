Page({
  data: {
    user: {
      username: '',
      email: '',
      studentid: '',
      age: '',
      gender: '',
      education: '',
      avatar: ''
    }
  },

  onLoad() {
    this.fetchUserData();
  },

  async fetchUserData() {
    try {
      const token = wx.getStorageSync('token'); // 从本地存储获取 token
      if (!token) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        });
        return;
      }

      const userId = wx.getStorageSync('userId'); // 假设 userId 存储在本地
      if (!userId) {
        wx.showToast({
          title: '用户信息缺失，请重新登录',
          icon: 'none'
        });
        return;
      }

      const res = await wx.request({
        url: `https://zhaoqiwangteaching.com/api/users/${userId}`, // 替换为实际的 API 地址
        method: 'GET',
        header: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.statusCode === 200) {
        this.setData({
          user: res.data.user
        });
      } else {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      wx.showToast({
        title: '网络错误，请稍后重试',
        icon: 'none'
      });
    }
  }
});