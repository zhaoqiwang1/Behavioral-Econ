import { userAPI } from '../../services/api.js';

Page({
  data: {
    formData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      studentid: '',
      age: '',
      gender: '',
      education: ''
    },
    // picker 选项
    genderOptions: ['请选择性别', '男', '女'],
    educationOptions: ['请选择学历', '本科生', '研究生', '博士生', '其他'],
    genderIndex: 0,
    educationIndex: 0
  },

  // ---------- 输入事件 ----------
  onUsernameInput(e) {
    this.setData({ 'formData.username': e.detail.value });
  },
  onEmailInput(e) {
    this.setData({ 'formData.email': e.detail.value });
  },
  onPasswordInput(e) {
    this.setData({ 'formData.password': e.detail.value });
  },
  onConfirmPasswordInput(e) {
    this.setData({ 'formData.confirmPassword': e.detail.value });
  },
  onStudentidInput(e) {
    this.setData({ 'formData.studentid': e.detail.value });
  },
  onAgeInput(e) {
    this.setData({ 'formData.age': e.detail.value });
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

  // ---------- 表单校验 ----------
  validateForm() {
    const { username, email, password, confirmPassword, studentid, age, gender, education } = this.data.formData;
    const errors = {};

    // 用户名
    if (!username.trim()) {
      errors.username = '用户名是必填的';
    } else if (username.length < 3) {
      errors.username = '用户名至少3个字符';
    }

    // 邮箱
    if (!email.trim()) {
      errors.email = '邮箱是必填的';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '请输入有效的邮箱地址';
    }

    // 密码
    if (!password) {
      errors.password = '密码是必填的';
    } else if (password.length < 6) {
      errors.password = '密码至少6个字符';
    }

    // 确认密码
    if (!confirmPassword) {
      errors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致';
    }

    // 学号（纯数字且正数）
    if (!studentid.trim()) {
      errors.studentid = '学号是必填的';
    } else if (!/^\d+$/.test(studentid.trim())) {
      errors.studentid = '学号只能包含数字';
    } else if (Number(studentid) <= 0) {
      errors.studentid = '学号必须是正数';
    }

    // 年龄
    if (!age) {
      errors.age = '年龄是必填的';
    } else {
      const ageNum = Number(age);
      if (isNaN(ageNum)) {
        errors.age = '年龄必须是数字';
      } else if (ageNum < 15) {
        errors.age = '年龄必须大于15岁';
      } else if (ageNum > 100) {
        errors.age = '请输入有效的年龄';
      }
    }

    // 性别
    if (!gender) {
      errors.gender = '请选择性别';
    }

    // 学历
    if (!education) {
      errors.education = '请选择学历';
    }

    return errors;
  },

  // ---------- 注册处理 ----------
  async handleRegister() {
    const errors = this.validateForm();
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      wx.showToast({ title: firstError, icon: 'none' });
      return;
    }

    wx.showLoading({ title: '注册中...' });

    try {
      const userData = {
        username: this.data.formData.username.trim(),
        email: this.data.formData.email.trim(),
        password: this.data.formData.password,
        studentid: Number(this.data.formData.studentid.trim()),
        age: Number(this.data.formData.age.trim()),
        gender: this.data.formData.gender,
        education: this.data.formData.education
      };

      const res = await userAPI.register(userData);
      console.log('注册返回:', res);

      // 请求成功即视为注册成功（后端返回 { message: "注册成功" }）
      wx.hideLoading(); // 先隐藏加载
      wx.showToast({
        title: res.message || '注册成功',
        icon: 'success'
      });

      // 延迟后返回登录页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);

    } catch (error) {
      console.error('注册异常:', error);
      wx.hideLoading();
      wx.showToast({
        title: error.message || '注册失败，请检查网络或联系管理员',
        icon: 'none'
      });
    }
    // 注意：不再使用 finally，避免重复调用 hideLoading
  },

  // ---------- 跳转登录 ----------
  goToLogin() {
    wx.navigateBack();
  }
});