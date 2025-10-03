import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  // withCredentials: true,
  timeout: 10000
});

// Users相关API
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (loginData) => api.post('/users/login', loginData),
};


export default api; 
