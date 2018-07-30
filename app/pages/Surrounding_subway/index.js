Page({
  data: {
    markers: [],
    location: [],
    station: [],
    scale: 14,
    arrow: true
  },
  onLoad: function(options) {

    var that = this;

    var location = wx.getStorageSync('location');


    var position = {};

    if (location) {
      position = {
        'lng': location.lng,
        'lat': location.lat
      }
    }

    wx.request({
      url: 'https://restapi.amap.com/v3/place/around',
      data: {
        key: '27d1827d9e2e058bb05132878f18cffb',
        location: position.lng + ',' + position.lat,
        keywords: '地铁',
        types: 150500,
        city: '东莞'
      },
      success: function(res) {
        if (res.data && res.data.pois) {
          var pois = res.data.pois;
          var poisData = [];
          var stationData = [];
          for (var i = 0; i < pois.length; i++) {
            if (pois[i].address != '(在建)1号线') {
              stationData.push(pois[i]);
              var location = pois[i].location.split(',');
              poisData.push({
                iconPath: '../../img/marker_metro_1.png',
                latitude: location[1],
                longitude: location[0],
                title: pois[i].name,
                id: pois[i].id,
                width: 20,
                height: 20,
                callout: {
                  content: pois[i].name
                }
              })
            }
          }
          that.setData({
            markers: poisData,
            location: position,
            station: stationData
          })
        }
      }
    })

  },
  // 伸缩 & 展开
  bindArrow() {
    var flag = this.data.arrow;
    this.setData({
      arrow: !flag
    })
  },
  goStation(e) {
    var location = (e.currentTarget.dataset.location).split(',');
    var name = e.currentTarget.dataset.name;
    wx.openLocation({
      latitude: parseFloat(location[1]),
      longitude: parseFloat(location[0]),
      name: name
    })
  }
})