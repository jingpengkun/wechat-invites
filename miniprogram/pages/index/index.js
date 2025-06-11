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
    activeTab: 'upcoming', // 'upcoming' or 'past'
    showEventModal: false,
    modalEvent: null
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
        },
        {
          id: '4',
          title: '音乐节',
          date: '2025年7月20日 16:00',
          location: '市体育馆',
          background: 'linear-gradient(to bottom, #f7971e, #ffd200)'
        },
        {
          id: '5',
          title: '家庭聚餐',
          date: '2025年8月5日 12:00',
          location: '外婆家餐厅',
          background: 'linear-gradient(to bottom, #f953c6, #b91d73)'
        },
        {
          id: '6',
          title: '毕业典礼',
          date: '2025年9月1日 09:30',
          location: '大学礼堂',
          background: 'linear-gradient(to bottom, #43cea2, #185a9d)'
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
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  onCardClick: function(e) {
    const eventId = e.currentTarget.dataset.id;
    const list = this.data.activeTab === 'upcoming' ? this.data.upcomingEvents : this.data.pastEvents;
    const event = list.find(ev => ev.id === eventId);
    if (event) {
      this.setData({ showEventModal: true, modalEvent: event });
    }
  },

  closeEventModal: function() {
    this.setData({ showEventModal: false, modalEvent: null });
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