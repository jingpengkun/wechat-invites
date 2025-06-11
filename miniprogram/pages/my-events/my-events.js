Page({
  data: {
    activeTab: 'created',
    createdEvents: [],
    joinedEvents: []
  },

  onLoad: function(options) {
    const tab = options.tab || 'created';
    this.setData({ activeTab: tab });
    this.loadEvents();
  },

  loadEvents: function() {
    const userId = wx.getStorageSync('userId');
    const events = wx.getStorageSync('events') || [];
    const createdEvents = events.filter(ev => ev.userId === userId);
    const joinedEvents = events; // 可扩展为用户参与的活动
    this.setData({ createdEvents, joinedEvents });
  },

  switchTab: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ activeTab: type });
  }
}); 