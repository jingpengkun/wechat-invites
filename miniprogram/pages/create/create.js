Page({
  data: {
    title: '',
    date: '',
    time: '',
    location: ''
  },

  onTitleInput: function(e) {
    this.setData({ title: e.detail.value });
  },

  onDateChange: function(e) {
    this.setData({ date: e.detail.value });
  },

  onTimeChange: function(e) {
    this.setData({ time: e.detail.value });
  },

  onLocationInput: function(e) {
    this.setData({ location: e.detail.value });
  },

  onSubmit: function() {
    const { title, date, time, location } = this.data;
    if (!title || !date || !time || !location) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    const userInfo = wx.getStorageSync('userInfo') || {};
    const userId = wx.getStorageSync('userId') || '';
    // 生成新活动对象
    const newEvent = {
      id: 'event_' + Date.now(),
      title,
      date: date + ' ' + time,
      location,
      organizer: userInfo.nickName || '未登录',
      userId: userId,
      description: '',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    };
    // 读取本地events
    let events = wx.getStorageSync('events') || [];
    events.push(newEvent);
    wx.setStorageSync('events', events);
    wx.showToast({ title: '活动创建成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  }
}); 