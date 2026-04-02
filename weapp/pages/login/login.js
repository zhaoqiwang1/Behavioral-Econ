// 记得导入 API
import { userAPI } from '../../services/api.js';

Page({
  data: {
    username: '',
    password: '',
    scrollTop: 0,
  },

  // 输入
  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  // 登录验证
  validateLogin() {
    const { username, password } = this.data
    const errors = []

    if (!username.trim()) {
      errors.push('用户名是必填的')
    } else if (username.length < 3) {
      errors.push('用户名至少3个字符')
    }

    if (!password) {
      errors.push('密码是必填的')
    } else if (password.length < 6) {
      errors.push('密码至少6个字符')
    }

    return errors
  },

  // ✅ 方法名统一：handleLogin（和wxml绑定一致）
  handleLogin() {
    const errors = this.validateLogin()
    if (errors.length > 0) {
      wx.showToast({ title: errors[0], icon: 'none' })
      return
    }
  
    const { username, password } = this.data
  
    userAPI.login({ username, password }).then(res => {
      const { token, user } = res
      wx.setStorageSync('token', token)
      wx.setStorageSync('user', user)
  
      wx.showToast({ title: '登录成功', icon: 'success' })
  
      setTimeout(() => {
        wx.navigateBack({ delta: 1 })
      }, 1000)
    }).catch(err => {
      console.error('登录失败:', err)
    })
  },

  // 去注册
  goRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  // 输入框聚焦
  onInputFocus(e) {
    const keyboardHeight = e.detail.height
    this.setData({
      scrollTop: keyboardHeight
    })
  },

  // 输入框失焦
  onInputBlur() {
    this.setData({
      scrollTop: 0
    })
  }
})