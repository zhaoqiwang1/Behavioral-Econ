import { userAPI } from '../../services/api.js';

Page({
  data: {
    isEditing: false,
    loading: false,
    displayUser: {
      username: '',
      email: '',
      studentid: '',
      age: '',
      gender: '',
      education: ''
    },
    formData: {
      username: '',
      email: '',
      studentid: '',
      age: '',
      gender: '',
      education: ''
    },
    genderOptions: ['请选择性别', '男', '女'],
    educationOptions: ['请选择学历', '本科生', '研究生', '博士生', '其他'],
    genderIndex: 0,
    educationIndex: 0,
    userId: null
  },

  onLoad() {
    this.fetchUserData();
  },

  async fetchUserData() {
    const token = wx.getStorageSync('token');
    if (!token || typeof token !== 'string' || token.trim() === '') {
        wx.showToast({ title: '请重新登录', icon: 'none' });
        setTimeout(() => {
        wx.navigateTo({ url: '/pages/login/login' });
        }, 1500);
        return;
    }

    // 1. 从本地缓存获取用户信息（包含 _id）
    const userStr = wx.getStorageSync('user');
    console.log('📦 本地 user 数据:', userStr);

    if (!userStr) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/login/login' });
      }, 1500);
      return;
    }

    let user;
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error('解析 user 失败:', e);
      wx.showToast({ title: '用户数据异常，请重新登录', icon: 'none' });
      return;
    }

    const userId = user._id;
    console.log('🆔 当前用户 ID:', userId);

    if (!userId) {
      wx.showToast({ title: '用户 ID 缺失，请重新登录', icon: 'none' });
      wx.removeStorageSync('user');
      wx.removeStorageSync('token');
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/login/login' });
      }, 1500);
      return;
    }

    this.setData({ userId });

    wx.showLoading({ title: '加载中...' });

    try {
      // 2. 调用后端接口获取最新用户信息
      const res = await userAPI.getUserProfile(userId);
      console.log('✅ 接口返回完整数据:', res);

      // 3. 提取 user 对象（后端返回结构：{ message, user }）
      const userData = res.user;
      if (!userData) {
        throw new Error('返回数据中没有 user 字段');
      }

      // 4. 安全获取 demographic
      const demo = userData.demographic || {};

      // 5. 组装显示数据
      const display = {
        username: userData.username || '',
        email: userData.email || '',
        studentid: demo.studentid || '',
        age: demo.age || '',
        gender: demo.gender || '',
        education: demo.education || ''
      };

      console.log('📋 解析后的显示数据:', display);

      // 6. 更新页面数据
      this.setData({
        displayUser: display,
        formData: { ...display } // 编辑模式初始值
      });

      // 7. 设置 picker 默认选中索引（用于显示当前值）
      const genderIdx = this.data.genderOptions.indexOf(display.gender);
      const eduIdx = this.data.educationOptions.indexOf(display.education);
      this.setData({
        genderIndex: genderIdx >= 0 ? genderIdx : 0,
        educationIndex: eduIdx >= 0 ? eduIdx : 0
      });

    } catch (error) {
      console.error('❌ 获取用户信息失败:', error);
      wx.showToast({
        title: error.message || '获取信息失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  // ---------- 输入事件 ----------
  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`formData.${field}`]: value
    });
  },

  // ---------- picker 事件 ----------
  onGenderChange(e) {
    const index = e.detail.value;
    const value = this.data.genderOptions[index];
    this.setData({
      genderIndex: index,
      'formData.gender': index === 0 ? '' : value
    });
  },

  onEducationChange(e) {
    const index = e.detail.value;
    const value = this.data.educationOptions[index];
    this.setData({
      educationIndex: index,
      'formData.education': index === 0 ? '' : value
    });
  },

  // ---------- 开始编辑 ----------
  startEdit() {
    this.setData({
      isEditing: true,
      formData: { ...this.data.displayUser }
    });
    // 更新 picker 索引
    const genderIdx = this.data.genderOptions.indexOf(this.data.formData.gender);
    const eduIdx = this.data.educationOptions.indexOf(this.data.formData.education);
    this.setData({
      genderIndex: genderIdx >= 0 ? genderIdx : 0,
      educationIndex: eduIdx >= 0 ? eduIdx : 0
    });
  },

  // ---------- 取消编辑 ----------
  cancelEdit() {
    this.setData({
      isEditing: false,
      formData: { ...this.data.displayUser }
    });
  },

  // ---------- 保存更改 ----------
  async saveChanges() {
    const { formData, userId } = this.data;

    // 简单校验
    if (!formData.username.trim()) {
      wx.showToast({ title: '用户名不能为空', icon: 'none' });
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      wx.showToast({ title: '请输入有效邮箱', icon: 'none' });
      return;
    }
    const ageNum = parseInt(formData.age);
    if (formData.age && (isNaN(ageNum) || ageNum < 1 || ageNum > 100)) {
      wx.showToast({ title: '请输入有效年龄（1-100）', icon: 'none' });
      return;
    }

    this.setData({ loading: true });
    wx.showLoading({ title: '更新中...' });

    try {
        const updateData = {
            username: formData.username.trim(),
            email: formData.email.trim(),
            studentid: formData.studentid ? Number(String(formData.studentid).trim()) : 0,
            age: formData.age ? Number(String(formData.age).trim()) : 0,
            gender: formData.gender,
            education: formData.education
          };

      const res = await userAPI.updateProfile(userId, updateData);
      console.log('更新成功返回:', res);

      // 后端返回 { message, user }
      const updatedUser = res.user;
      if (!updatedUser) {
        throw new Error('更新成功但未返回用户数据');
      }

      // 更新本地缓存
      const oldUserStr = wx.getStorageSync('user');
      const oldUser = oldUserStr ? JSON.parse(oldUserStr) : {};
      const newUser = { ...oldUser, ...updatedUser };
      wx.setStorageSync('user', JSON.stringify(newUser));

      // 更新页面显示
      const demo = updatedUser.demographic || {};
      const display = {
        username: updatedUser.username || '',
        email: updatedUser.email || '',
        studentid: demo.studentid || '',
        age: demo.age || '',
        gender: demo.gender || '',
        education: demo.education || ''
      };
      this.setData({
        displayUser: display,
        isEditing: false,
        loading: false
      });

      wx.hideLoading();
      wx.showToast({ title: '资料更新成功', icon: 'success' });

    } catch (error) {
      console.error('更新失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: error.message || '更新失败，请重试',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  // ---------- 返回上一页 ----------
  goBack() {
    wx.navigateBack();
  }
});