const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    questions: [
      "太阳的寿命(单位:十亿年)",
      "全世界的陆地面积(单位:千平方公里)",
      "联合国成员国（即会员国）的数目（单位：个）",
      "人体肌肉的总数（单位：块）",
      "2012年中国人口老龄化率(以百分比表示)",
      "牛顿发现万有引力的年份（具体的年份时间）",
      "2010年中国回族人口（单位：千人）",
      "东方明珠塔高度(单位:米)",
      "中国南北跨度(单位:公里)",
      "大西洋的深度(单位:米)"
    ],
    answers: [],
    isSubmitting: false,
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
    this.setData({ 
      userId: userInfo._id,
      answers: Array(10).fill({ lowerBound: '', upperBound: '' })
    });
  },

  onShow() {
    auth.updateLastActivity();
  },

  // 输入最低值
  onLowerInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const newAnswers = [...this.data.answers];
    newAnswers[index] = { ...newAnswers[index], lowerBound: value };
    this.setData({ answers: newAnswers });
  },

  // 输入最高值
  onUpperInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const newAnswers = [...this.data.answers];
    newAnswers[index] = { ...newAnswers[index], upperBound: value };
    this.setData({ answers: newAnswers });
  },

  // 验证
  validateAnswers() {
    const answers = this.data.answers;
    for (let i = 0; i < answers.length; i++) {
      const a = answers[i];
      if (!a.lowerBound || a.lowerBound === '' || !a.upperBound || a.upperBound === '') {
        wx.showToast({ title: `请填写第 ${i+1} 题的上下限`, icon: 'none' });
        return false;
      }
      const low = parseFloat(a.lowerBound);
      const high = parseFloat(a.upperBound);
      if (isNaN(low) || isNaN(high) || low >= high) {
        wx.showToast({ title: `第 ${i+1} 题：最低值必须小于最高值`, icon: 'none' });
        return false;
      }
    }
    return true;
  },

  // 提交
  onSubmit() {
    if (this.data.isSubmitting || this.data.hasSubmitted) return;
    if (!this.validateAnswers()) return;

    this.setData({ isSubmitting: true });

    const formattedAnswers = this.data.answers.map((ans, idx) => ({
      questionNumber: idx + 1,
      lowerBound: parseFloat(ans.lowerBound),
      upperBound: parseFloat(ans.upperBound)
    }));

    request({
      url: '/overconfidencegame/submit',
      method: 'POST',
      data: {
        userId: this.data.userId,
        answers: formattedAnswers
      }
    })
      .then(res => {
        wx.showToast({ title: '提交成功！', icon: 'success' });
        this.setData({ hasSubmitted: true });
      })
      .catch(err => {
        console.error('提交错误:', err);
        if (err.statusCode === 409 && err.data?.alreadySubmitted) {
          wx.showToast({ title: '你已经完成过这个游戏，不能重复参与', icon: 'none' });
          this.setData({ hasSubmitted: true });
          return;
        }
        const msg = err.data?.message || '提交失败，请重试';
        wx.showToast({ title: msg, icon: 'none' });
      })
      .finally(() => {
        this.setData({ isSubmitting: false });
      });
  }
});