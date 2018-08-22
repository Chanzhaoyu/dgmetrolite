Page({

  data: {
    modelMask: false,
    stationToggle: true
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...'
    })
    let that = this;
    if (!options) {
      wx.showModal({
        title: '错误',
        content: '数据异常，请重新选择起点或者终点'
      })
      return;
    }
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/transit/',
      data: {
        key: '6BCBZ-KYCWU-EMGVO-2YUB2-WLYJE-D4FYE',
        from: options.origin,
        to: options.end
      },
      success: function(res) {
        let programme = res.data.result.routes[0];
        let lineValue = [];
        for (let i = 0; i < programme.steps.length; i++) {
          if (programme.steps[i].mode == 'TRANSIT') {
            lineValue.push(programme.steps[i])
          }
        }
        that.setData({
          value: lineValue[0].lines[0],
          origin: options.origin,
          end: options.end,
          modelMask: true
        })
        wx.hideLoading()
      }
    })
  },
  bindToggle() {
    let flag = this.data.stationToggle;
    this.setData({
      stationToggle: !flag
    })
  },
  goPage() {
    wx.switchTab({
      url: '/pages/metro/index'
    })
  },
  onShareAppMessage(e) {
    let origin = this.data.origin;
    let end = this.data.end;
    let value = this.data.value;
    return {
      title: value.geton.title + '—' + value.getoff.title,
      path: '/pages/query_view/index?origin=' + origin + '&end=' + end
    }
  }
})