const app = getApp()
Page({
  data: {
    isLoading: false,
    gameScrollLeft: 0,
    resultScrollLeft: 0,
    hwScrollLeft: 0,
    itemWidth: 510, 
    totalItem: 16,
    gameCurrentIndex: 0,
    resultCurrentIndex: 0,
    gameIndicators: [0,1,2,3],
    resultIndicators: [0,1,2,3],
    hwIndicators: [0,1]
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
  scrollHwLeft() {
    this.setData({ hwScrollLeft: this.data.hwScrollLeft - 300 })
  },
  scrollHwRight() {
    this.setData({ hwScrollLeft: this.data.hwScrollLeft + 300 })
  },
    // ========== 新增滚动监听 ==========
    onGameScroll(e) {
        const scrollLeft = e.detail.scrollLeft
        const itemWidth = 510  // 480(按钮宽) + 30(间距)
        // 计算当前滚动到哪个按钮
        const index = Math.round(scrollLeft / itemWidth)
        // 限制范围
        const maxIndex = this.data.gameIndicators.length - 1
        const newIndex = Math.min(Math.max(index, 0), maxIndex)
        // 更新高亮索引（只有变化时才 setData，提高性能）
        if (newIndex !== this.data.gameCurrentIndex) {
          this.setData({ gameCurrentIndex: newIndex })
        }
      },

      onResultScroll(e) {
        const scrollLeft = e.detail.scrollLeft
        const itemWidth = 510  // 480(按钮宽) + 30(间距)
        // 计算当前滚动到哪个按钮
        const index = Math.round(scrollLeft / itemWidth)
        // 限制范围
        const maxIndex = this.data.resultIndicators.length - 1
        const newIndex = Math.min(Math.max(index, 0), maxIndex)
        // 更新高亮索引（只有变化时才 setData，提高性能）
        if (newIndex !== this.data.resultCurrentIndex) {
          this.setData({ resultCurrentIndex: newIndex })
        }
      },

      onHwScroll(e) {
        const scrollLeft = e.detail.scrollLeft
        const itemWidth = 510  // 480(按钮宽) + 30(间距)
        // 计算当前滚动到哪个按钮
        const index = Math.round(scrollLeft / itemWidth)
        // 限制范围
        const maxIndex = this.data.hwIndicators.length - 1
        const newIndex = Math.min(Math.max(index, 0), maxIndex)
        // 更新高亮索引（只有变化时才 setData，提高性能）
        if (newIndex !== this.data.hwCurrentIndex) {
          this.setData({ hwCurrentIndex: newIndex })
        }
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

