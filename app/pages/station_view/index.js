let stationData = require('../../utils/station_data.js');

Page({
  data: {
    tabIndex: 0,
    /*站点遮罩数据*/
    stationName: '',
    stationKey: 0,
    lineIndex: 0,
    mapHidden: true
  },
  onLoad(options) {
    let that = this;
    if (options) {
      let localData = stationData.station;

      this.setData({
        options: options,
        stationName: localData[options.line].line_name,
        stationData: localData[options.line].line_station[options.key]
      })

      // 地铁站经纬度
      let lng = localData[options.line].line_station[options.key].longitude;
      let lat = localData[options.line].line_station[options.key].latitude;
      wx.request({
        url: 'https://restapi.amap.com/v3/place/around',
        data: {
          key: "27d1827d9e2e058bb05132878f18cffb",
          location: lng + ',' + lat,
          keywords: "公交",
          types: 150700,
          city: '东莞',
        },
        success: function(res) {
          let pois = []
          if (res.data.pois) {
            pois = res.data.pois;
            for (let i = 0; i < pois.length; i++) {

              pois[i].address = pois[i].address.split(';')

              if (pois[i].distance && pois[i].distance > 1000) {
                pois[i].distance = (pois[i].distance / 1000).toFixed(1) + '公里'
              } else {
                pois[i].distance = pois[i].distance + '米'
              }
            }
            that.setData({
              pois: pois
            })
          }
        }
      })

      wx.request({
        url: 'https://restapi.amap.com/v3/place/around',
        data: {
          key: "27d1827d9e2e058bb05132878f18cffb",
          location: lng + ',' + lat,
          keywords: "厕所",
          types: 200300,
          city: '东莞',
        },
        success: function(res) {
          console.log(res);
        }
      })
    }


  },
  bindPickerChange(e) {
    this.setData({
      key: e.detail.value
    })
  },
  tabChange(e) {
    let num = e.currentTarget.dataset.index;
    if (num == '2') {
      this.setData({
        mapHidden: false
      })
    } else {
      this.setData({
        mapHidden: true
      })
    }

    this.setData({
      tabIndex: num
    })
  },
  toStation(e) {
    let lat = parseFloat(e.currentTarget.dataset.lat);
    let lon = parseFloat(e.currentTarget.dataset.lon);
    let name = e.currentTarget.dataset.name;
    let en_name = e.currentTarget.dataset.en;
    wx.openLocation({
      name: name,
      address: "点击右侧按钮开启地图导航",
      latitude: lat,
      longitude: lon,
      scale: 24
    })
  },
  // 线路预览
  viewLine(e) {
    let imgUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [imgUrl]
    })
  },
  // 线路遮罩
  modalShow() {
    this.setData({
      modalFlag: false
    })
  },
  // 站点选中
  stationBind(e) {
    this.setData({
      stationName: e.currentTarget.dataset.name,
      stationKey: e.currentTarget.dataset.key,
      modalFlag: true
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
  },
  onShareAppMessage(e) {
    let value = e.currentTarget.dataset.option;
    return {
      title: '东莞地铁信息',
      path: '/pages/station_view/index?name=' + value.name + '&key=' + value.key + '&line=' + value.line
    }
  }
})