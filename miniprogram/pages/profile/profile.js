Page({
  data: {
    userInfo: {},
    isLoggedIn: false,
    userId: '',
    loginTime: '',
    showActivityModal: false,
    activityTab: 'created',
    createdEvents: [],
    joinedEvents: []
  },

  onLoad: function() {
    this.checkLoginStatus();
    this.loadActivityLists();
  },

  onShow: function() {
    this.checkLoginStatus();
    this.loadActivityLists();
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

  loadActivityLists: function() {
    const userId = wx.getStorageSync('userId');
    const events = wx.getStorageSync('events') || [];
    // 发起的活动
    const createdEvents = events.filter(ev => ev.userId === userId);
    // 参与的活动（此处暂用全部活动模拟，后续可扩展）
    const joinedEvents = events;
    this.setData({ createdEvents, joinedEvents });
  },

  showActivityTab: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      showActivityModal: true,
      activityTab: type
    });
  },

  closeActivityModal: function() {
    this.setData({ showActivityModal: false });
  },

  switchActivityTab: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ activityTab: type });
  },

  handleLogin: function() {
    if (this.data.isLoggedIn) return;
    var that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function(res) {
        var userInfo = res.userInfo;
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
        that.loadActivityLists();
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: function() {
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        });
      }
    });
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
            userId: '',
            createdEvents: [],
            joinedEvents: []
          });
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  goToMyEvents: function(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/my-events/my-events?tab=' + type
    });
  }
}); 