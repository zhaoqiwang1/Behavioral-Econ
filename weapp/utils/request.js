// utils/request.js
const baseURL = 'https://zhaoqiwangteaching.com/api';

const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');
    console.log('原始 token:', token); // 打印原始值

    const header = {
      'Content-Type': 'application/json',
      ...options.header
    };

    if (token && typeof token === 'string') {
      // 1. 去除所有不可见字符（换行、空格、制表符等）
      let cleanToken = token.replace(/[\r\n\t\s]+/g, '');
      console.log('清理后 token:', cleanToken);

      // 2. 检查是否包含非 ASCII 字符（ISO-8859-1 只允许 0x00-0xFF）
      if (/[^\x00-\xFF]/.test(cleanToken)) {
        console.error('Token 包含非 ISO-8859-1 字符:', cleanToken);
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        wx.showToast({ title: 'Token 异常，请重新登录', icon: 'none' });
        // 直接拒绝，不继续发送请求
        reject(new Error('Token contains non-ASCII characters'));
        return;
      }

      header.Authorization = `Bearer ${cleanToken}`;
    }

    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: header,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          if (res.statusCode === 401) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            wx.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
            wx.navigateTo({ url: '/pages/login/login' });
          }
          reject({ statusCode: res.statusCode, data: res.data });
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
};

module.exports = request;