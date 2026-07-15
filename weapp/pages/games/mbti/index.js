const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    mbtiResult: '',
    loading: false,
    hasSubmitted: false,
    userId: ''
  },

  onLoad() {
    auth.updateLastActivity();

    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo._id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ userId: userInfo._id });
  },

  onShow() {
    auth.updateLastActivity();
  },

  onInput(e) {
    let val = e.detail.value;
    // 只保留字母，转为大写
    val = val.replace(/[^a-zA-Z]/g, '').toUpperCase();
    this.setData({ mbtiResult: val });
  },

  onSubmit() {
    const { userId, mbtiResult, loading, hasSubmitted } = this.data;
    if (loading || hasSubmitted || !mbtiResult.trim()) return;

    this.setData({ loading: true });

    request({
      url: '/mbtielicit/submit',
      method: 'POST',
      data: {
        userId: userId,
        mbtiAnswers: mbtiResult.trim()
      }
    })
      .then(res => {
        wx.showToast({ title: '提交成功！', icon: 'success' });
        this.setData({ hasSubmitted: true });
      })
      .catch(err => {
        console.error('提交错误:', err);
        if (err.statusCode === 409 && err.data?.alreadySubmitted) {
          wx.showToast({ title: '你已经提交过，不能重复提交', icon: 'none' });
          this.setData({ hasSubmitted: true });
          return;
        }
        const msg = err.data?.message || '提交失败，请重试';
        wx.showToast({ title: msg, icon: 'none' });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  }
});