const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    currentRound: 1,
    totalRounds: 20,
    contribution: '',
    loading: false,
    hasSubmitted: false,
    userId: ''
  },

  onShow() {
    auth.updateLastActivity(); 
  },

  onLoad() {
    // 获取用户ID
    const userInfo = wx.getStorageSync('userInfo');
    console.log('游戏页面获取到的 userInfo:', userInfo);
    if (!userInfo || !userInfo._id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ userId: userInfo._id });

    // 可选：查询已有进度（需要后端支持），若不支持则从第1回合开始
    // this.fetchProgress();
  },

  // 输入控制：只允许0-20
  onInput(e) {
    let val = e.detail.value;
    if (val === '') {
      this.setData({ contribution: '' });
      return;
    }
    let num = parseInt(val);
    if (isNaN(num)) return;
    if (num < 0) num = 0;
    if (num > 20) num = 20;
    this.setData({ contribution: num.toString() });
  },

  onSubmit() {
    const { userId, currentRound, contribution, loading, totalRounds } = this.data;
    if (loading) return;
    const val = parseInt(contribution);
    if (isNaN(val) || val < 0 || val > 20) {
      wx.showToast({ title: '请输入0-20之间的数字', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    request({
      url: '/publicgoods/submit',
      method: 'POST',
      data: {
        userId: userId,
        round: currentRound,
        contribution: val
      }
    })
      .then(res => {
        wx.showToast({ title: `第${currentRound}回合提交成功`, icon: 'success' });
        if (res.isCompleted) {
          this.setData({ hasSubmitted: true });
        } else {
          this.setData({
            currentRound: currentRound + 1,
            contribution: ''
          });
        }
      })
      .catch(err => {
        console.error('完整错误对象:', err);
        console.error('状态码:', err.statusCode);
        console.error('返回数据:', err.data);
        const msg = err?.data?.message || '提交失败，请重试';
        wx.showToast({ title: msg, icon: 'none' });
        // 若冲突（409），可尝试查进度，但不强制
        if (err.statusCode === 409) {
          // 可提示用户跳至下一回合（简单处理：手动加1）
          if (currentRound < totalRounds) {
            this.setData({
              currentRound: currentRound + 1,
              contribution: ''
            });
          } else {
            this.setData({ hasSubmitted: true });
          }
        }
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  }
});