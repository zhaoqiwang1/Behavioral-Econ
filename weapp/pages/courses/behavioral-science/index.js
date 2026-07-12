const app = getApp()
Page({
  data: {
    isLoading: false,
    gameScrollLeft: 0,
    resultScrollLeft: 0
  },

  onLoad() {
    // 页面加载自动置顶
    wx.pageScrollTo({ scrollTop: 0, duration: 0 })
  },

  // 统一登录校验（复用首页逻辑）
  checkLogin(url, msg) {
    if (this.data.isLoading) return
    this.setData({ isLoading: true })
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showModal({
        title: '请先登录',
        content: msg,
        confirmText: '去登录',
        cancelText: '取消',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' })
          }
        },
        complete: () => {
          this.setData({ isLoading: false })
        }
      })
      return false
    }
    // 已登录跳转
    wx.navigateTo({ url })
    this.setData({ isLoading: false })
    return true
  },

  // 跳转课程大纲
  goToSyllabus() {
    this.checkLogin('/pages/courses/behavioral-science/syllabus', '登录后查看课程大纲')
  },

  // 功能开发中提示
  showDevTip() {
    wx.showToast({ title: '功能开发中，敬请期待', icon: 'none' })
  },

  // ========== 横向滚动逻辑 ==========
  scrollGameLeft() {
    this.setData({ gameScrollLeft: this.data.gameScrollLeft - 300 })
  },
  scrollGameRight() {
    this.setData({ gameScrollLeft: this.data.gameScrollLeft + 300 })
  },
  scrollResultLeft() {
    this.setData({ resultScrollLeft: this.data.resultScrollLeft - 300 })
  },
  scrollResultRight() {
    this.setData({ resultScrollLeft: this.data.resultScrollLeft + 300 })
  },

  // ========== 各实验密码弹窗跳转 ==========
  // 公共物品游戏
  handlePublicGoodsGame() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'PublicGoodsGame') {
          this.checkLogin('/games/public-goods', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // 风险评估
  handleRiskAttiGame() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'RiskAttiGame') {
          this.checkLogin('/games/risk-attitude-elicit', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // 模糊偏好评估
  handleAmbiguityAttiGame() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'AmbiguityAttiGame') {
          this.checkLogin('/games/ambiguity-attitude-elicit', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // 过度自信
  handleOverconfidenceGame() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'OverconfidenceGame') {
          this.checkLogin('/games/overconfidence-game', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // 模糊环境博弈
  handleGameUnderAmbig() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'GameUnderAmbig') {
          this.checkLogin('/games/game-under-ambiguity', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // MBTI
  handleMBTIElicit() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'MBTIElicit') {
          this.checkLogin('/games/mbti-elicit-game', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // 证实偏差
  handleConfirmationBiasGame() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'ConfirmationBiasGame') {
          this.checkLogin('/games/confirmation-bias-game', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // OUS问卷
  handleOUSSurvey() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'OUSSurvey') {
          this.checkLogin('/games/ous-survey', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // MFQ问卷
  handleMFQSurvey() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'MFQSurvey') {
          this.checkLogin('/games/mfq-survey', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // SVO问卷
  handleSVOSurvey() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'SVOSurvey') {
          this.checkLogin('/games/svo-survey', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },
  // PVQ问卷
  handlePVQSurvey() {
    wx.showModal({
      title: '输入密码',
      editable: true,
      placeholderText: '请输入实验密码',
      success: res => {
        if (!res.content) return
        if (res.content === 'PVQSurvey') {
          this.checkLogin('/games/pvq-survey', '你需要先登录哦')
        } else {
          wx.showToast({ title: '密码错误', icon: 'error' })
        }
      }
    })
  },

  // 查看风险偏好统计结果
  handleShowRiskAtti() {
    this.checkLogin('/gameresults/show-risk-attitudes', '你需要先登录哦')
  }
})
