Page({
  data: {
    mapUrl: "http://9me9em.m9.magic2008.cn/ufile/59795/img/map.png"
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
      title: '东莞地铁出行',
      path: '/pages/subway_map/index'
    }
  }
})