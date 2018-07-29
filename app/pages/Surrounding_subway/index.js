Page({
  data: {
    location: {},
    markers: [],
    arrow: true
  },
  onLoad: function (options) {
    var that = this;
    var markers = [];
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var lng = res.longitude;
        var lat = res.latitude;
        that.setData({
          'location.lng': lng,
          'location.lat': lat
        });
        wx.request({
          url: 'https://restapi.amap.com/v3/place/around',
          data: {
            key: '27d1827d9e2e058bb05132878f18cffb',
            location: lng + ',' + lat,
            keywords: '地铁',
            city: '东莞'
          },
          success: function (res) {
            if (res.data && res.data.pois) {
              var pois = res.data.pois;
              var poisData = [];
              for (var i = 0; i < pois.length; i++) {
                var location = pois[i].location.split(',');
                poisData.push({
                  iconPath: '/static/icon/mark.png',
                  latitude: location[0],
                  longitude: location[1],
                  width: 31,
                  height: 42
                })
              }
            }
          }
        })
      }
    })
  },
  // 伸缩 & 展开
  bindArrow() {
    var flag = this.data.arrow;
    this.setData({
      arrow: !flag
    })
  }
})