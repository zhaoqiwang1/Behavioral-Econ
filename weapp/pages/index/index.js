Page({
    data: {},
  
    // 去行为经济学
    goToBehavioralScience() {
        wx.navigateTo({
          url: '/pages/courses/behavioral-science/index', // 路径按你自己的改
        })
      },
  
    // 去逻辑学
    goToLogic() {
        wx.navigateTo({
          url: '/pages/courses/logic/index', // 按你实际路径修改
        })
      },
  
    // 去R语言
    goR() {
      this.checkLogin('/pages/course/course?type=r')
    },
  
    // 统一判断登录
    checkLogin(url) {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.showModal({
          title: '请先登录',
          content: '登录后即可查看完整课程',
          confirmText: '去登录',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({ url: '/pages/login/login' })
            }
          }
        })
        return
      }
  
      wx.navigateTo({ url })
    }
  })