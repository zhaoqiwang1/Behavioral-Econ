// 获取当前环境
const isDev = wx.getStorageSync('isDev') || true; // true为开发环境

// 基础URL配置
const BASE_URL = isDev ? 'http://localhost:3001/api' : 'http://8.138.170.90:3001/api';

// 通用请求方法
const request = (url, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
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
        } else {
          reject(res.data);
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};

// GET请求
const get = (url) => request(url, 'GET');

// POST请求
const post = (url, data) => request(url, 'POST', data);

// PUT请求
const put = (url, data) => request(url, 'PUT', data);

// Users相关API
export const userAPI = {
  register: (userData) => post('/users/register', userData),
  login: (loginData) => post('/users/login', loginData),
  updateProfile: (userId, userData) => put(`/users/${userId}`, userData),
  getUserProfile: (userId) => get(`/users/${userId}`),
};

// Risk Attitudes Elicit Game 相关API
export const riskAttiAPI = {
  submit: (userData) => post('/riskatti/submit', userData),
  getResults: () => get('/riskatti/results'),
};

// Ambiguity Attitudes Elicit Game 相关API
export const ambiguityAttiAPI = {
  submit: (userData) => post('/ambiguityatti/submit', userData),
};

// Public Goods Game 相关API
export const publicGoodsAPI = {
  submit: (userData) => post('/publicgoods/submit', userData),
};

// Overconfidence Game 相关API
export const overconfidenceGameAPI = {
  submit: (userData) => post('/overconfidencegame/submit', userData),
};

// Game Under Ambiguity 相关API
export const gameUnderAmbiguityAPI = {
  submit: (userData) => post('/gameunderambiguity/submit', userData),
};

// MBTI 相关API
export const mbtiElicitAPI = {
  submit: (userData) => post('/mbtielicit/submit', userData),
};

// Confirmation Bias Game 相关API
export const confirmationBiasGameAPI = {
  submit: (userData) => post('/confirmationbiasgame/submit', userData),
};

// OUS Survey 相关API
export const ousSurveyAPI = {
  submit: (userData) => post('/oussurvey/submit', userData),
  getQuestions: () => get('/oussurvey/questions'),
};

// MFQ Survey 相关API
export const mfqSurveyAPI = {
  submit: (userData) => post('/mfqsurvey/submit', userData),
  getQuestions: () => get('/mfqsurvey/questions'),
};

// SVO Survey 相关API
export const svoSurveyAPI = {
  submit: (userData) => post('/svosurvey/submit', userData),
  getQuestions: () => get('/svosurvey/questions'),
};

// PVQ Survey 相关API
export const pvqSurveyAPI = {
  submit: (userData) => post('/pvqsurvey/submit', userData),
  getQuestions: () => get('/pvqsurvey/questions'),
};

export default { userAPI, riskAttiAPI, ambiguityAttiAPI, publicGoodsAPI, overconfidenceGameAPI, gameUnderAmbiguityAPI, mbtiElicitAPI, confirmationBiasGameAPI, ousSurveyAPI, mfqSurveyAPI, svoSurveyAPI, pvqSurveyAPI };