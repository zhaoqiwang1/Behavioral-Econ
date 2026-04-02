// ==========================================
// 🔥 生产环境正式配置（已用你的 HTTPS 域名）
// ==========================================
const BASE_URL = 'http://8.138.170.90:3001/api'; 

// 通用请求（自动带 token、统一错误处理、401自动跳登录）
const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {

    // 显示加载
    wx.showNavigationBarLoading();

    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } 

        // 401 未登录 → 自动跳登录页
        else if (res.statusCode === 401) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('user');

          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none',
            duration: 1500
          });

          setTimeout(() => {
            wx.navigateTo({ url: '/pages/login/login' });
          }, 1500);

          reject(res.data);
        } 

        // 其他错误
        else {
          wx.showToast({
            title: res.data?.message || '请求失败',
            icon: 'none'
          });
          reject(res.data);
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络异常，请稍后重试',
          icon: 'none'
        });
        reject('网络异常');
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      }
    });
  });
};

// 请求方法封装
const get  = (url) => request(url, 'GET');
const post = (url, data) => request(url, 'POST', data);
const put  = (url, data) => request(url, 'PUT', data);

// ==========================================
// 🔥 所有 API 保持不变，完全兼容你的现有代码
// ==========================================
export const userAPI = {
  register: (userData) => post('/users/register', userData),
  login: (loginData) => post('/users/login', loginData),
  updateProfile: (userId, userData) => put(`/users/${userId}`, userData),
  getUserProfile: (userId) => get(`/users/${userId}`),
};

export const riskAttiAPI = {
  submit: (userData) => post('/riskatti/submit', userData),
  getResults: () => get('/riskatti/results'),
};

export const ambiguityAttiAPI = {
  submit: (userData) => post('/ambiguityatti/submit', userData),
};

export const publicGoodsAPI = {
  submit: (userData) => post('/publicgoods/submit', userData),
};

export const overconfidenceGameAPI = {
  submit: (userData) => post('/overconfidencegame/submit', userData),
};

export const gameUnderAmbiguityAPI = {
  submit: (userData) => post('/gameunderambiguity/submit', userData),
};

export const mbtiElicitAPI = {
  submit: (userData) => post('/mbtielicit/submit', userData),
};

export const confirmationBiasGameAPI = {
  submit: (userData) => post('/confirmationbiasgame/submit', userData),
};

export const ousSurveyAPI = {
  submit: (userData) => post('/oussurvey/submit', userData),
  getQuestions: () => get('/oussurvey/questions'),
};

export const mfqSurveyAPI = {
  submit: (userData) => post('/mfqsurvey/submit', userData),
  getQuestions: () => get('/mfqsurvey/questions'),
};

export const svoSurveyAPI = {
  submit: (userData) => post('/svosurvey/submit', userData),
  getQuestions: () => get('/svosurvey/questions'),
};

export const pvqSurveyAPI = {
  submit: (userData) => post('/pvqsurvey/submit', userData),
  getQuestions: () => get('/pvqsurvey/questions'),
};

export default {
  userAPI,
  riskAttiAPI,
  ambiguityAttiAPI,
  publicGoodsAPI,
  overconfidenceGameAPI,
  gameUnderAmbiguityAPI,
  mbtiElicitAPI,
  confirmationBiasGameAPI,
  ousSurveyAPI,
  mfqSurveyAPI,
  svoSurveyAPI,
  pvqSurveyAPI
};