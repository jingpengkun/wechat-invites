Page({
  data: {
    userInfo: {},
    isLoggedIn: false,
    userId: '',
    loginTime: ''
  },

  onLoad: function() {
    this.checkLoginStatus();
  },

  onShow: function() {
    this.checkLoginStatus();
  },

  checkLoginStatus: function() {
    var userInfo = wx.getStorageSync('userInfo');
    var loginTime = wx.getStorageSync('loginTime');
    var userId = wx.getStorageSync('userId');
    this.setData({
      userInfo: userInfo || {},
      isLoggedIn: !!userInfo,
      loginTime: loginTime || '',
      userId: userId || ''
    });
  },

  handleLogin: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      var userInfo = e.detail.userInfo;
      var loginTime = new Date().toLocaleString();
      var userId = 'user_' + Date.now();
      wx.setStorageSync('userInfo', userInfo);
      wx.setStorageSync('loginTime', loginTime);
      wx.setStorageSync('userId', userId);
      that.setData({
        userInfo: userInfo,
        isLoggedIn: true,
        loginTime: loginTime,
        userId: userId
      });
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      });
    }
  },

  handleLogout: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('loginTime');
          wx.removeStorageSync('userId');
          that.setData({
            userInfo: {},
            isLoggedIn: false,
            loginTime: '',
            userId: ''
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  }
}); 