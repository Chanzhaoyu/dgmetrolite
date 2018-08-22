// pages/test/index.js
Page({
  data: {

  },
  onLoad: function(options) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/transit/',
      data: {
        key: '6BCBZ-KYCWU-EMGVO-2YUB2-WLYJE-D4FYE',
        from: '23.085668,113.857779',
        to: '22.926457,113.664306'
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
})