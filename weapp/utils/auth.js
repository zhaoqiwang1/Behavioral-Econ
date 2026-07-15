// utils/auth.js
const AUTO_LOGOUT_TIME = 3 * 60 * 60 * 1000; // 3 小时
// const AUTO_LOGOUT_TIME = 60 * 1000; // 1 分钟
const STORAGE_KEY_LAST_ACTIVITY = 'lastActivityTime';

/**
 * 更新最后活动时间（只写 Storage）
 */
function updateLastActivity() {
  const now = Date.now();
  wx.setStorageSync(STORAGE_KEY_LAST_ACTIVITY, now);
}

/**
 * 检查是否超时，若超时则自动登出
 * @returns {boolean} 是否已登出
 */
function checkAutoLogout() {
  const lastActivity = wx.getStorageSync(STORAGE_KEY_LAST_ACTIVITY);
  if (!lastActivity) {
    // 首次使用，记录当前时间
    updateLastActivity();
    return false;
  }
  const now = Date.now();
  if (now - lastActivity > AUTO_LOGOUT_TIME) {
    // 超时，执行登出
    logout('登录超时，请重新登录');
    return true;
  }
  return false;
}

/**
 * 统一登出函数（清除本地数据）
 * @param {string} tip - 提示信息（可选）
 */
function logout(tip = '已退出登录') {
  // 1. 清除本地存储
  wx.removeStorageSync('token');
  wx.removeStorageSync('userInfo');
  wx.removeStorageSync(STORAGE_KEY_LAST_ACTIVITY);

  // 2. 尝试清除全局数据（若 app 可用）
  try {
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.token = null;
      app.globalData.userInfo = null;
      app.globalData.lastActivityTime = null;
    }
  } catch (e) {
    // 忽略
  }

  // 3. 提示用户
  wx.showToast({ title: tip, icon: 'none', duration: 1500 });

  // 4. 跳转到登录页（若当前不在登录页）
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  if (currentPage && currentPage.route !== 'pages/login/login') {
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/login/login' });
    }, 1500);
  }
}

/**
 * 检查登录状态
 */
function isLoggedIn() {
  const token = wx.getStorageSync('token');
  const userInfo = wx.getStorageSync('userInfo');
  return !!(token && userInfo && userInfo._id);
}

/**
 * 获取当前用户信息
 */
function getUserInfo() {
  return wx.getStorageSync('userInfo') || null;
}

/**
 * 获取 token
 */
function getToken() {
  return wx.getStorageSync('token') || '';
}

module.exports = {
  updateLastActivity,
  checkAutoLogout,
  logout,
  isLoggedIn,
  getUserInfo,
  getToken,
  AUTO_LOGOUT_TIME
};