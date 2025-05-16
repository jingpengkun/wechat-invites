// pages/event/event.js
Page({
  data: {
    event: null,
    loading: true
  },

  onLoad: function(options) {
    const eventId = options.id;
    // 尝试从首页缓存获取活动详情
    const pages = getCurrentPages();
    let event = null;
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2];
      const allEvents = (prevPage.data.upcomingEvents || []).concat(prevPage.data.pastEvents || []);
      event = allEvents.find(ev => ev.id === eventId);
    }
    if (!event) {
      // 兜底：找不到则用默认数据
      event = {
        id: eventId,
        title: "活动",
        date: "",
        location: "",
        background: "linear-gradient(to bottom, #4158D0, #C850C0)",
        description: "",
        organizer: "无名称",
        attendees: []
      };
    }
    this.setData({
      event,
      loading: false
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