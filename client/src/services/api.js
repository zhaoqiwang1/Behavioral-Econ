import axios from 'axios';

// #region 旧版 判断当前环境（开发环境还是生产环境）
// 开发环境：本地运行时，process.env.NODE_ENV 为 'development'
// 生产环境：构建后部署到服务器时，process.env.NODE_ENV 为 'production'
const isProduction = process.env.NODE_ENV === 'production';
// #endregion

// 创建axios实例
const api = axios.create({
  // 生产环境用空字符串（自动拼接当前域名/IP），开发环境用本地地址
  baseURL: isProduction ? 'http://8.138.170.90:3001/api' : 'http://localhost:3001/api',
  // withCredentials: true,  // 如果需要跨域携带cookie，可开启
  timeout: 10000
});

// Users相关API
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (loginData) => api.post('/users/login', loginData),
  updateProfile: (userId, userData) => api.put(`/users/${userId}`, userData),
  getUserProfile: (userId) => api.get(`/users/${userId}`),
};

// Risk Attitudes Elict Game 相关API
export const riskAttiAPI = {
  submit: (userData) => api.post('/riskatti/submit', userData),
  getResults: () => api.get('/riskatti/results'),
};

// Ambiguity Attitudes Elict Game 相关API
export const ambiguityAttiAPI = {
  submit: (userData) => api.post('/ambiguityatti/submit', userData),
};

// Public Goods Game 相关API
export const publicGoodsAPI = {
  submit: (userData) => api.post('/publicgoods/submit', userData),
};

// Overconfidence Game 相关API
export const overconfidenceGameAPI = {
  submit: (userData) => api.post('/overconfidencegame/submit', userData),
};

// Game Under Ambiguity 相关API
export const gameUnderAmbiguityAPI = {
  submit: (userData) => api.post('/gameunderambiguity/submit', userData),
};

// MBTI 相关API
export const mbtiElicitAPI = {
  submit: (userData) => api.post('/mbtielicit/submit', userData),
};

// Confirmation Bias Game 相关API
export const confirmationBiasGameAPI = {
  submit: (userData) => api.post('/confirmationbiasgame/submit', userData),
};

// OUS Survey 相关API
export const ousSurveyAPI = {
  submit: (userData) => api.post('/oussurvey/submit', userData),
  getQuestions: () => api.get('/oussurvey/questions'),
};

// MFQ Survey 相关API
export const mfqSurveyAPI = {
  submit: (userData) => api.post('/mfqsurvey/submit', userData),
  getQuestions: () => api.get('/mfqsurvey/questions'),
};

// SVO Survey 相关API
export const svoSurveyAPI = {
  submit: (userData) => api.post('/svosurvey/submit', userData),
  getQuestions: () => api.get('/svosurvey/questions'),
};

export default api; 


// #region Appendix

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   timeout: 10000
// });

// #region 旧版 创建axios实例
// const api = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   // withCredentials: true,
//   timeout: 10000
// });
// #endregion

  
// #endregion