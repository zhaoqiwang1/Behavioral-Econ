const { navigateToGame } = require('../../../utils/gameHelper');
const auth = require('../../../utils/auth.js');
const app = getApp();

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

  onShow() {
    auth.updateLastActivity(); 
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
    wx.navigateTo({
        url: '/pages/courses/syllabus/behavioral-science/index'
      });
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
    navigateToGame({
        gameName: '实验1',
        password: 'PGG',   // 写死密码
        url: '/pages/games/publicGoods/index'
      });
  },
  // 风险评估
  handleRiskAttiGame() {
    navigateToGame({
        gameName: '实验2',
        password: 'RAG',   // 与网页端密码一致
        url: '/pages/games/riskAtti/index'
      });
  },
  // 模糊偏好评估
  handleAmbiguityAttiGame() {
    navigateToGame({
        gameName: '实验3',
        password: 'AAG',   // 与网页端密码一致
        url: '/pages/games/ambiguityAtti/index'
      });
  },
  // 过度自信
  handleOverconfidenceGame() {
    navigateToGame({
        gameName: '实验4',
        password: 'OG',   // 与网页端密码一致
        url: '/pages/games/overconfidence/index'
      });
  },
  // 模糊环境博弈
  handleGameUnderAmbig() {
    navigateToGame({
        gameName: '实验5',
        password: 'GUA',
        url: '/pages/games/gameUnderAmbiguity/index'
      });
  },
  // MBTI
  handleMBTIElicit() {
    navigateToGame({
        gameName: '实验6',
        password: 'MBTI',
        url: '/pages/games/mbti/index'
      });
  },
  // 证实偏差
  handleConfirmationBiasGame() {
    navigateToGame({
        gameName: '实验7',
        password: 'CBG',
        url: '/pages/games/confirmationBias/index'
      });
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
    navigateToGame({
        gameName: '实验9',
        password: 'MS',
        url: '/pages/games/mfqSurvey/index'
      });
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

