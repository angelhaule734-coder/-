Page({
  data: {
    activeTab: 'HOME'
  },

  onLoad: function (options) {
    // Initial load logic
  },

  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    
    // Scroll to top when switching tabs
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  openLocation: function() {
    // Open Map with specific coordinates for Jiaozhuanghu
    wx.openLocation({
      latitude: 40.2458, // Approx coordinates
      longitude: 116.8922,
      scale: 18,
      name: '北京焦庄户地道战遗址纪念馆',
      address: '北京市顺义区龙湾屯镇焦庄户村'
    });
  }
})