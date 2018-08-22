Page({
  data: {
    mapUrl: "http://www.dggdjt.com/itcms/uploads/5/image/public/201806/20180612110408_qngpncyslc.jpg"
  },
  onLoad: function(options) {

  },
  viewZoom() {
    let url = this.data.mapUrl;
    wx.previewImage({
      urls: [url]
    })
  },
  onShareAppMessage: function() {
    return {
      title: '东莞地铁票价',
      path: '/pages/ticket/index'
    }
  }
})