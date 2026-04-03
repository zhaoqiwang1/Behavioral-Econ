import { userAPI } from '../../services/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      username: '',
      password: ''
    }
  },

  /**
   * 输入框事件处理
   */
  onUsernameInput: function(e) {
    this.setData({
      'formData.username': e.detail.value
    });
  },

  onPasswordInput: function(e) {
    this.setData({
      'formData.password': e.detail.value
    });
  },

  /**
   * 登录处理函数
   */
  handleLogin: async function() {
    console.log('--- 登录按钮被点击 ---');
    const { username, password } = this.data.formData;
    console.log('表单数据:', this.data.formData); 
    if (!username.trim()) {
      wx.showToast({
        title: '请输入账户名',
        icon: 'none'
      });
      return;
    }

    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '登录中...'
    });

    try {
      // 调用后端登录接口
      console.log('1. 准备发起请求');
      const res = await userAPI.login({ username, password });
      console.log('2. 请求返回，res =', res);
      if (res.token && res.user) {
        wx.setStorageSync('token', res.token);
        wx.setStorageSync('user', JSON.stringify(res.user));

        wx.showToast({ title: '登录成功', icon: 'success' });
        console.log('准备跳转...');
        setTimeout(() => {
            console.log('执行跳转...');
            wx.navigateBack({ delta: 1 });
        }, 1000);
    } else {
        console.log('4. 登录失败分支，res.success =', res.success);
        console.log('登录失败分支，返回数据：', res);
        wx.showToast({ title: res.message || '登录失败', icon: 'none' });
      }
    } catch (error) {
      console.error('5. 捕获到异常：', error);
      console.error('Login error:', error); 
      wx.hideLoading();
      
      wx.showToast({
        title: error.message || '登录失败，请检查账户名和密码',
        icon: 'none'
      });
    }
  }
})