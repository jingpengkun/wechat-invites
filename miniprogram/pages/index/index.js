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
          organizer: '小明',
          userId: 'demo_user',
          description: '一起庆祝生日，欢迎参加！',
          background: 'linear-gradient(135deg, #e9efff 0%, #dbeafe 100%)'
        },
        {
          id: '2',
          title: '团队聚会',
          date: '2025年5月15日 19:30',
          location: '公司会议室',
          organizer: '小红',
          userId: 'demo_user',
          description: '团队成员聚会，增进感情。',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        },
        {
          id: '3',
          title: '周末郊游',
          date: '2025年6月10日 09:00',
          location: '城市公园',
          organizer: '小王',
          userId: 'demo_user',
          description: '周末一起去郊游吧！',
          background: 'linear-gradient(to bottom, #0093E9, #80D0C7)'
        },
        {
          id: '4',
          title: '音乐节',
          date: '2025年7月20日 16:00',
          location: '市体育馆',
          organizer: '小李',
          userId: 'demo_user',
          description: '音乐节狂欢夜。',
          background: 'linear-gradient(to bottom, #f7971e, #ffd200)'
        },
        {
          id: '5',
          title: '家庭聚餐',
          date: '2025年8月5日 12:00',
          location: '外婆家餐厅',
          organizer: '小张',
          userId: 'demo_user',
          description: '家庭成员聚餐。',
          background: 'linear-gradient(to bottom, #f953c6, #b91d73)'
        },
        {
          id: '6',
          title: '毕业典礼',
          date: '2025年9月1日 09:30',
          location: '大学礼堂',
          organizer: '校长',
          userId: 'demo_user',
          description: '见证人生重要时刻。',
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
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