Page({
  data: {
    id: '',
    title: '',
    date: '',
    time: '',
    location: ''
  },

  onLoad: function(options) {
    const id = options.id;
    let events = wx.getStorageSync('events') || [];
    const event = events.find(ev => ev.id === id);
    if (event) {
      const [date, time] = event.date.split(' ');
      this.setData({
        id: event.id,
        title: event.title,
        date: date || '',
        time: time || '',
        location: event.location || ''
      });
    }
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
    const { id, title, date, time, location } = this.data;
    if (!title || !date || !time || !location) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    let events = wx.getStorageSync('events') || [];
    const idx = events.findIndex(ev => ev.id === id);
    if (idx !== -1) {
      events[idx].title = title;
      events[idx].date = date + ' ' + time;
      events[idx].location = location;
      wx.setStorageSync('events', events);
      wx.showToast({ title: '修改成功', icon: 'success' });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  }
}); 