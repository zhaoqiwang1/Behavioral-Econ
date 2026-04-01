// app.js
App({
  // 全局数据（所有页面都能通过 getApp() 访问）
  globalData: {
    userInfo: null,
    baseUrl: 'http://zhaoqiwangteaching.com' // 先写HTTP，等HTTPS开通后改成https
  },

  // 小程序启动时触发（只执行一次）
  onLaunch() {
    console.log('小程序启动了！')
    // 1. 检查本地是否有用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
    // 2. 后续可以在这里做登录、权限校验等
  },

  // 小程序显示到前台时触发（每次切回来都执行）
  onShow() {
    console.log('小程序进入前台')
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