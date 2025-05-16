// pages/index/index.js
function parseDate(dateStr) {
  // 兼容 iOS/安卓，日期格式为 yyyy年MM月dd日 HH:mm
  return new Date(dateStr.replace(/年|月/g, '-').replace('日', '').replace(/\s/, 'T'));
}

Page({
  data: {
    events: [],
    upcomingEvents: [],
    pastEvents: [],
    activeTab: 'upcoming' // 'upcoming' or 'past'
  },

  onLoad: function() {
    this.loadEvents();
  },

  onShow: function() {
    this.loadEvents();
  },

  loadEvents: function() {
    let events = wx.getStorageSync('events') || [];
    if (!events.length) {
      // 默认数据
      events = [
        {
          id: '1',
          title: '生日派对',
          date: '2025年4月26日 18:00',
          location: '家中',
          background: 'linear-gradient(to bottom, #4158D0, #C850C0)'
        },
        {
          id: '2',
          title: '团队聚会',
          date: '2025年5月15日 19:30',
          location: '公司会议室',
          background: 'linear-gradient(to bottom, #00DBDE, #FC00FF)'
        },
        {
          id: '3',
          title: '周末郊游',
          date: '2025年6月10日 09:00',
          location: '城市公园',
          background: 'linear-gradient(to bottom, #0093E9, #80D0C7)'
        }
      ];
      wx.setStorageSync('events', events);
    }
    this.setData({ events });
    this.filterEvents(events);
  },

  filterEvents: function(events) {
    const now = new Date();
    const upcoming = [];
    const past = [];
    (events || []).forEach(event => {
      const eventDate = parseDate(event.date);
      if (eventDate >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });
    this.setData({
      upcomingEvents: upcoming,
      pastEvents: past
    });
  },

  switchTab: function(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  createEvent: function() {
    wx.navigateTo({
      url: '/pages/create/create'
    });
  },

  goToEvent: function(e) {
    const eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/event/event?id=' + eventId
    });
  },

  formatDate: function(dateString) {
    return dateString;
  },

  goToProfile: function() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  }
})