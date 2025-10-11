import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 创建上下文
const AuthContext = createContext();

// 提供者组件
export const AuthProvider = ({ children }) => {
  // ========== 1. 状态和Ref定义 ==========
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 新增：加载状态
  const inactivityTimerRef = useRef(null);   // 用于存储定时器的引用
  const navigate = useNavigate();

  // ========== 2. 对外暴露的API函数（必须先定义） ==========
  // #region 登录函数
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token || 'default-token');
    localStorage.setItem('loginTime', new Date().toISOString()); // 记录登录时间
  };
  // #endregion

  // #region 登出函数
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime'); // ✅ 新增：清理登录时间
    // 清除定时器
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  };
  // #endregion

  // ========== 3. 工具函数（依赖login保存的数据） ==========
  // #region 检查登录是否过期（超过2小时）
  // 这个函数只返回true or false这两个值中的一个，用来判断是否登录过期
  const checkLoginExpired = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return true; // 没有登录时间，视为过期
    const now = new Date();
    const login = new Date(loginTime);
    const hoursElapsed = (now - login) / (1000 * 60 * 60); // 计算小时数
    return hoursElapsed >= 2; // 2小时过期
  };
  // #endregion
  
  // ========== 4. 核心业务函数 ==========
  // #region 自动登出函数
  const autoLogout = useCallback(()  => {
    console.log('自动登出触发');
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime'); 
    // 清除定时器
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // 跳转到主页
    setTimeout(() => {
      navigate('/');
    }, 0);
  }, [navigate]);
  // #endregion

  // ========== 5. 使用useCallback包装的函数 ==========
  // #region 重置不活动定时器
    const resetInactivityTimer = useCallback(() => {
    // 只有已登录用户才需要定时器
    if (!isAuthenticated) return; // 当 isAuthenticated 为 false 时，return 在这里的作用是终止当前函数的执行，不再继续运行该条件判断之后的代码。
    // 清除之前的定时器
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    // 设置新的15分钟定时器（测试时可改为更短时间）
    inactivityTimerRef.current = setTimeout(() => {
      autoLogout();
      alert('由于长时间无操作，已自动登出');
    }, 30 * 60 * 1000); // 30分钟
  }, [isAuthenticated, autoLogout]); // 依赖 isAuthenticated
  // #endregion

  // ========== 6. useEffect（放在最后） ==========
    // #region 页面加载时检查 localStorage
    useEffect(() => {
      const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          try {
            // 检查登录是否过期（超过2小时）
            if (checkLoginExpired()) {
              console.log('登录已过期，自动登出');
              autoLogout();
            } else {
              // 登录未过期，恢复状态
              setUser(JSON.parse(userData));
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.error('解析用户数据失败:', error);
            // 如果数据损坏，清理 localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('loginTime');
          }
        }
        setLoading(false); // 检查完成
      };

      checkAuthStatus();

      // 设置定期检查
      const expiryCheckInterval = setInterval(() => {
        const userData = localStorage.getItem('user');
        const loginTime = localStorage.getItem('loginTime');
        
        if (userData && loginTime && checkLoginExpired()) {
            console.log('定期检查发现登录过期');
            autoLogout();
            alert('登录已过期，请重新登录');
          }
      }, 60 * 1000);

      // 清理函数
      return () => {
        clearInterval(expiryCheckInterval);
      };
    }, [autoLogout]); 
  // #endregion

  // #region 监听用户活动
  useEffect(() => {
    if (!isAuthenticated) return;
    // 启动定时器
    resetInactivityTimer();
    // 用户活动事件列表
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const handleUserActivity = () => {
      resetInactivityTimer();
    };
    // 添加事件监听
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    // 初始化定时器
    resetInactivityTimer();

    // 清理函数
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isAuthenticated, resetInactivityTimer]);
  // #endregion

  // ========== 7. Context Value 和 Provider ==========
  const value = {
    user,
    isAuthenticated,
    loading, 
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，方便使用
export const useAuth = () => {
  return useContext(AuthContext);
};


// #region 如何理解整个AuthContext.jsx代码：

// 1. 第一个useeffect的作用其实是在实现登录是否超过规定时间（2小时），如果超过，那么这个useEffect就执行自动登出。且这个登录时间是否过期的话，会每分钟都要检查一次；一旦检查出登录过期，就自动登出；否则就正常保持登录状态。
// 2. 用户长时间停留在网页，没有任何动作，自动登出。这个功能是由第二个useEffect来实现的。在这个useEffect里面，一旦有任何点击、移动、按键等操作，那么就重置那个定时器；一旦15分钟没有任何动作，那么就会执行resetInactivityTimer 里写好的autologout函数，就自动登出了。一旦因为这个原因自动登出了，这个useEffect的最后就在return那里，取消所有的eventlistener，也同时cleartimeout。保证定义的东西在自动登出后不再重复定义。
// 3. 在这两个useEffect前面的代码都是在定义一些函数，定义一些功能状态等等；把他们定义好了，清楚后；最后的那两个useEffect就开始按照我们需要的方式来使用它们，从而实现：1.登录超时自动登出；2.15分钟没有动作自动登出，这两个功能。
// 4. 当然了，logout这个函数是一直有的，这个函数的主要用途就在于把它和navbar的登出按钮绑定，这样按下登出函数后，就手动logout了。
// 5. 这样一来，我们的三个登出的情况就都实现了。

// #endregion