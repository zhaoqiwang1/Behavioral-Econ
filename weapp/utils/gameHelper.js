// utils/gameHelper.js

/**
 * 检查登录状态，未登录则弹窗引导
 * @returns {Promise<boolean>} true表示已登录，false表示用户取消或未登录
 */
function checkLogin() {
    return new Promise((resolve) => {
      const token = wx.getStorageSync('token');
      if (token) {
        resolve(true);
        return;
      }
      wx.showModal({
        title: '请先登录',
        content: '该实验需要登录后才能参与',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' });
            resolve(false);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
  
  /**
   * 通用游戏跳转函数
   * @param {Object} config
   * @param {string} config.gameName - 游戏名称（仅用于提示）
   * @param {string} config.password - 正确密码
   * @param {string} config.url - 跳转的游戏页面路径
   * @param {boolean} config.needLogin - 是否需要登录（默认true）
   * @returns {Promise<void>}
   */
  async function navigateToGame({ gameName, password, url, needLogin = true }) {
    if (needLogin) {
      const loggedIn = await checkLogin();
      if (!loggedIn) return; // 用户取消登录
    }
  
    // 弹窗输入密码
    const pwdResult = await new Promise((resolve) => {
      wx.showModal({
        title: `输入“${gameName}”实验密码`,
        editable: true,
        placeholderText: '请输入实验密码',
        success: (res) => {
          if (res.confirm) {
            resolve(res.content || '');
          } else {
            resolve(null); // 用户取消
          }
        }
      });
    });
  
    if (pwdResult === null) return; // 取消输入
  
    // 本地验证密码
    if (pwdResult === password) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '密码错误', icon: 'error' });
    }
  }
  
  module.exports = {
    checkLogin,
    navigateToGame
  };