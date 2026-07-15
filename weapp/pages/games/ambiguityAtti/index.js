const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    options: [],
    selectedIndex: null,
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

    // 生成选项数据（11个，盒子K黑球数从100递减到0，盒子U固定为"Unknown"）
    const options = [];
    for (let i = 0; i < 11; i++) {
      const id = i + 1;
      const boxK = 100 - i * 10;
      options.push({
        id: id,
        boxK: boxK,
        boxU: 'Unknown'
      });
    }
    this.setData({ options });
  },

  onShow() {
    auth.updateLastActivity();
  },

  // 选择选项
  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedIndex: index });
  },

  // 提交
  onSubmit() {
    const { userId, selectedIndex, loading, hasSubmitted } = this.data;
    if (loading || hasSubmitted || selectedIndex === null) return;

    this.setData({ loading: true });

    request({
      url: '/ambiguityatti/submit',
      method: 'POST',
      data: {
        userId: userId,
        ambiguityAttitude: selectedIndex + 1   // 序号 1-11
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