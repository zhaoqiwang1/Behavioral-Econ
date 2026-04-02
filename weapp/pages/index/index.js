Page({
    data: {
      isLoading: false // 新增：防重复点击锁
    },
  
    // 去行为经济学
    goToBehavioralScience() {
      this.checkLogin('/pages/courses/behavioral-science/index')
    },
  
    // 去逻辑学
    goToLogic() {
      this.checkLogin('/pages/courses/logic/index')
    },
  
    // 去R语言
    goR() {
      this.checkLogin('/pages/course/course?type=r')
    },
  
    // 去登录
    goToLogin() {
      wx.navigateTo({ 
        url: '/pages/login/login',
        success: () => {
          console.log('Navigation to login page successful')
        },
        fail: (err) => {
          console.error('Navigation to login page failed:', err)
        }
      })
    },
  
    // 统一判断登录（最终稳定版）
    checkLogin(url) {
      // 1. 防重复点击：如果正在加载，直接返回
      if (this.data.isLoading) return
      this.setData({ isLoading: true })
  
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.showModal({
          title: '请先登录',
          content: '登录后即可查看完整课程',
          confirmText: '去登录',
          cancelText: '取消',
          success: res => {
            // console.log('Modal result:', res)
            if (res.confirm) {
              wx.navigateTo({ 
                url: '/pages/login/login',
                success: () => console.log('跳登录页成功'),
                fail: (err) => console.error('跳登录页失败:', err)
              })
            }
          },
          // 2. 无论点击确认/取消，都解锁按钮
          complete: () => {
            this.setData({ isLoading: false })
          }
        })
        return
      }
  
      // 已登录，正常跳转课程页
      wx.navigateTo({ 
        url,
        success: () => console.log('跳课程页成功'),
        fail: (err) => console.error('跳课程页失败:', err)
      })
      // 3. 跳转完成后解锁按钮
      .finally(() => {
        this.setData({ isLoading: false })
      })
    }
  })