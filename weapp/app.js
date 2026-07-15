const auth = require('./utils/auth.js');

// app.js
App({
  // 全局数据（所有页面都能通过 getApp() 访问）
  globalData: {
    userInfo: null,
    token: null,
    lastActivityTime: null,
    baseUrl: 'https://zhaoqiwangteaching.com' // 先写HTTP，等HTTPS开通后改成https
  },

  // 小程序启动时触发（只执行一次）
  onLaunch() {
    console.log('小程序启动了！')
    // 1. 检查本地是否有用户信息
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo')
    if (token && userInfo) {
        this.globalData.token = token;
        this.globalData.userInfo = userInfo;
      }
    auth.updateLastActivity();
    // 2. 后续可以在这里做登录、权限校验等
  },


  // 登录成功调用此方法，统一存储
  loginSuccess(token, userInfo) {
    this.globalData.token = token;
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('token', token);
    wx.setStorageSync('userInfo', userInfo);
  },

  // 退出登录
  logout() {
    this.globalData.token = null;
    this.globalData.userInfo = null;
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    // 如有其他需要清理的数据，可在此添加
  },
  
  // 小程序显示到前台时触发（每次切回来都执行）
  onShow() {
    // 每次进入前台时检查是否超时（自动登出）
    console.log('小程序进入前台');
    const loggedOut = auth.checkAutoLogout();
    if (!loggedOut) {
      // 若未登出，更新活动时间（相当于重新计时）
      auth.updateLastActivity();
    }
  },
  
  // 小程序切到后台时触发
  onHide() {
    console.log('小程序进入后台')
  },

  // 全局错误捕获（方便排查问题）
  onError(err) {
    console.error('小程序报错：', err)
  }
})