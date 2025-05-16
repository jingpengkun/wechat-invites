// pages/index/index.js
Page({
  data: {
    events: [
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
    ]
  },

  onLoad: function() {
    // 页面加载时执行
  },

  // 跳转到创建活动页面
  createEvent: function() {
    // 在实际应用中，这里应该跳转到创建活动页面
    wx.showToast({
      title: '创建活动功能开发中',
      icon: 'none'
    });
  },

  // 跳转到事件详情页面
  goToEvent: function(e) {
    const eventId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/event/event?id=' + eventId
    });
  },

  // 格式化日期
  formatDate: function(dateString) {
    return dateString;
  },

  // 跳转到个人中心页面
  goToProfile: function() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  }
})