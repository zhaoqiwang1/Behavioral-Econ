const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    rounds: [],
    currentRound: 0,
    totalRounds: 8,
    answers: [],
    tempChoice: null,
    doneCount: 0,
    hasSubmitted: false,
    submitting: false,
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

    // 回合数据（与网页端一致）
    const rounds = [
      { round: 1, optionA: { self: 6.6, other: 5.8 }, optionB: { self: 10, other: 2, probability: "50%" } },
      { round: 2, optionA: { self: 5, other: 3.3 }, optionB: { self: 7.5, other: 2, probability: "未知" } },
      { round: 3, optionA: { self: 6.6, other: 5 }, optionB: { self: 7.5, other: 3.3, probability: "50%" } },
      { round: 4, optionA: { self: 3.3, other: 2.5 }, optionB: { self: 5, other: 2, probability: "50%" } },
      { round: 5, optionA: { self: 6.6, other: 5 }, optionB: { self: 7.5, other: 3.3, probability: "未知" } },
      { round: 6, optionA: { self: 5, other: 3.3 }, optionB: { self: 7.5, other: 2, probability: "50%" } },
      { round: 7, optionA: { self: 3.3, other: 2.5 }, optionB: { self: 5, other: 2, probability: "未知" } },
      { round: 8, optionA: { self: 6.6, other: 5.8 }, optionB: { self: 10, other: 2, probability: "未知" } }
    ];
    const answers = Array(8).fill(null);
    this.setData({ rounds, answers });
  },

  onShow() {
    auth.updateLastActivity();
  },

  // 选择选项（临时）
  selectOption(e) {
    const choice = e.currentTarget.dataset.choice;
    const { currentRound, answers } = this.data;
    if (answers[currentRound] !== null) {
      wx.showToast({ title: '该回合已完成，不能修改', icon: 'none' });
      return;
    }
    this.setData({ tempChoice: choice });
  },

  // 确认选择
  confirmChoice() {
    const { currentRound, tempChoice, answers } = this.data;
    if (!tempChoice) {
      wx.showToast({ title: '请先选择一个选项', icon: 'none' });
      return;
    }
    if (answers[currentRound] !== null) {
      wx.showToast({ title: '该回合已完成', icon: 'none' });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentRound] = tempChoice;
    const doneCount = newAnswers.filter(a => a !== null).length;
    let nextRound = currentRound + 1;
    while (nextRound < this.data.totalRounds && newAnswers[nextRound] !== null) {
      nextRound++;
    }
    this.setData({
      answers: newAnswers,
      tempChoice: null,
      currentRound: nextRound,
      doneCount: doneCount
    });
  },

  // 跳转回合
  goToRound(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    const { answers, currentRound } = this.data;
    if (answers[index] === null && index !== currentRound) {
      wx.showToast({ title: '请按顺序完成回合', icon: 'none' });
      return;
    }
    this.setData({ currentRound: index, tempChoice: null });
  },

  // 提交所有
  submitAll() {
    const { userId, answers, submitting, hasSubmitted, totalRounds } = this.data;
    if (submitting || hasSubmitted) return;
    const doneCount = answers.filter(a => a !== null).length;
    if (doneCount < totalRounds) {
      wx.showToast({ title: '请完成所有回合', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    const formattedAnswers = answers.map((choice, idx) => ({
      roundNumber: idx + 1,
      choice: choice
    }));

    request({
      url: '/gameunderambiguity/submit',
      method: 'POST',
      data: {
        userId: userId,
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
          wx.showToast({ title: '你已经完成过这个实验，不能重复参与', icon: 'none' });
          this.setData({ hasSubmitted: true });
          return;
        }
        const msg = err.data?.message || '提交失败，请重试';
        wx.showToast({ title: msg, icon: 'none' });
      })
      .finally(() => {
        this.setData({ submitting: false });
      });
  }
});