// pages/event/event.js
Page({
  data: {
    event: null,
    loading: true,
    allEvents: [],
    currentIndex: 0
  },

  onLoad: function(options) {
    const eventId = options.id;
    // 获取所有活动
    const pages = getCurrentPages();
    let allEvents = [];
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2];
      allEvents = (prevPage.data.upcomingEvents || []).concat(prevPage.data.pastEvents || []);
    }
    // 如果allEvents为空，则从本地加载
    if (!allEvents.length) {
      allEvents = wx.getStorageSync('events') || [];
    }
    let currentIndex = 0;
    if (allEvents.length > 0) {
      currentIndex = allEvents.findIndex(ev => ev.id === eventId);
      if (currentIndex < 0) currentIndex = 0;
    }
    this.setData({
      allEvents,
      currentIndex,
      event: allEvents[currentIndex] || null,
      loading: false
    });
  },

  onSwiperChange: function(e) {
    const idx = e.detail.current;
    this.setData({
      currentIndex: idx,
      event: this.data.allEvents[idx] || null
    });
  },

  // 返回首页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 参加活动
  attend: function() {
    wx.showToast({
      title: '已确认参加',
      icon: 'success'
    });
  },

  // 不参加活动
  decline: function() {
    wx.showToast({
      title: '已确认不参加',
      icon: 'none'
    });
  },

  // 可能参加
  maybe: function() {
    wx.showToast({
      title: '已确认可能参加',
      icon: 'none'
    });
  },

  onEdit: function() {
    wx.navigateTo({
      url: '/pages/edit/edit?id=' + this.data.event.id
    });
  }
})