// pages/event/event.js
Page({
  data: {
    event: null,
    loading: true
  },

  onLoad: function(options) {
    // 获取事件ID
    const eventId = options.id;
    
    // 模拟获取事件数据
    // 在实际应用中，这里应该调用API获取事件数据
    this.setData({
      event: {
        id: eventId,
        title: "生日派对",
        date: "2025年4月26日 18:00",
        location: "家中",
        background: "linear-gradient(to bottom, #4158D0, #C850C0)",
        description: "欢迎参加我的生日派对！我们将有美食、游戏和音乐。期待您的到来！",
        organizer: "无名称",
        attendees: [
          { id: "1", name: "A" },
          { id: "2", name: "B" },
          { id: "3", name: "C" },
        ],
      },
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
  }
})