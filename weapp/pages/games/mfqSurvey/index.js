const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    questions: [],
    answers: [],        // 存储每个问题的得分 (0-5)，未选为 null
    loadingQuestions: true,
    loading: false,
    hasSubmitted: false,
    userId: '',
    allAnswered: false,
    part1Labels: {
      0: '完全不相关',
      1: '不太相关',
      2: '略微相关',
      3: '一定程度相关',
      4: '非常相关',
      5: '极度相关'
    },
    part2Labels: {
      0: '强烈不同意',
      1: '中度不同意',
      2: '轻微不同意',
      3: '轻微同意',
      4: '中度同意',
      5: '强烈同意'
    }
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

    // 加载题目
    request({
      url: '/mfqsurvey/questions',
      method: 'GET'
    })
      .then(res => {
        if (res.questions && Array.isArray(res.questions)) {
          const qs = res.questions;
          qs.sort((a, b) => a.questionNumber - b.questionNumber);
          this.setData({
            questions: qs,
            answers: Array(qs.length).fill(null)
          }, () => this.updateAllAnswered());
        } else {
          wx.showToast({ title: '获取题目失败', icon: 'none' });
        }
      })
      .catch(err => {
        console.error('加载题目失败:', err);
        wx.showToast({ title: '加载失败，请重试', icon: 'none' });
      })
      .finally(() => {
        this.setData({ loadingQuestions: false });
      });
  },

  onShow() {
    auth.updateLastActivity();
  },

  // 更新是否全部回答
  updateAllAnswered() {
    const ans = this.data.answers;
    const allAnswered = ans.every(v => v !== null && v !== undefined);
    this.setData({ allAnswered });
  },

  // 点击选项（使用 bindtap，确保不误触）
  onOptionTap(e) {
    const index = e.currentTarget.dataset.qIndex;
    const value = parseInt(e.currentTarget.dataset.value);
    if (isNaN(index) || isNaN(value)) return;

    const currentAnswers = this.data.answers.slice(); // 复制数组
    // 如果已选相同值，则取消选择；否则设置为该值
    if (currentAnswers[index] === value) {
      currentAnswers[index] = null;
    } else {
      currentAnswers[index] = value;
    }
    this.setData({ answers: currentAnswers }, () => this.updateAllAnswered());
  },

  // 提交
  onSubmit(e) {
    const { userId, answers, loading, hasSubmitted } = this.data;
    if (loading || hasSubmitted) return;

    if (!this.data.allAnswered) {
      wx.showToast({ title: '请回答所有问题', icon: 'none' });
      return;
    }

    const formattedAnswers = answers.map((score, idx) => ({
      questionNumber: idx + 1,
      score: score
    }));

    this.setData({ loading: true });

    request({
      url: '/mfqsurvey/submit',
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
        if (err.statusCode === 409) {
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