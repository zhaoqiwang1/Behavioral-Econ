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

    // 获取用户 ID
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo._id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ userId: userInfo._id });

    // 生成选项数据（与网页端一致）
    const optionAData = [
      { part1: "1/10", value1: "$2.00", part2: "9/10", value2: "$1.60" },
      { part1: "2/10", value1: "$2.00", part2: "8/10", value2: "$1.60" },
      { part1: "3/10", value1: "$2.00", part2: "7/10", value2: "$1.60" },
      { part1: "4/10", value1: "$2.00", part2: "6/10", value2: "$1.60" },
      { part1: "5/10", value1: "$2.00", part2: "5/10", value2: "$1.60" },
      { part1: "6/10", value1: "$2.00", part2: "4/10", value2: "$1.60" },
      { part1: "7/10", value1: "$2.00", part2: "3/10", value2: "$1.60" },
      { part1: "8/10", value1: "$2.00", part2: "2/10", value2: "$1.60" },
      { part1: "9/10", value1: "$2.00", part2: "1/10", value2: "$1.60" },
      { part1: "10/10", value1: "$2.00", part2: "0/10", value2: "$1.60" },
    ];
    const optionBData = [
      { part1: "1/10", value1: "$3.85", part2: "9/10", value2: "$0.10" },
      { part1: "2/10", value1: "$3.85", part2: "8/10", value2: "$0.10" },
      { part1: "3/10", value1: "$3.85", part2: "7/10", value2: "$0.10" },
      { part1: "4/10", value1: "$3.85", part2: "6/10", value2: "$0.10" },
      { part1: "5/10", value1: "$3.85", part2: "5/10", value2: "$0.10" },
      { part1: "6/10", value1: "$3.85", part2: "4/10", value2: "$0.10" },
      { part1: "7/10", value1: "$3.85", part2: "3/10", value2: "$0.10" },
      { part1: "8/10", value1: "$3.85", part2: "2/10", value2: "$0.10" },
      { part1: "9/10", value1: "$3.85", part2: "1/10", value2: "$0.10" },
      { part1: "10/10", value1: "$3.85", part2: "0/10", value2: "$0.10" },
    ];

    const options = optionAData.map((a, idx) => ({
      optionA: `${a.part1} of ${a.value1},  ${a.part2} of ${a.value2}`,
      optionB: `${optionBData[idx].part1} of ${optionBData[idx].value1},  ${optionBData[idx].part2} of ${optionBData[idx].value2}`
    }));
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
      url: '/riskatti/submit',
      method: 'POST',
      data: {
        userId: userId,
        riskAttitude: selectedIndex + 1   // 后端期望 1-10
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