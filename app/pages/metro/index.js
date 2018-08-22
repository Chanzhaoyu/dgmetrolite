let stationData = require('../../utils/station_data.js');

Page({
  data: {
    bannerUrls: [
      '/static/images/logo_01.png'
    ],
    lineIndex: 0,
    lineMask: false,
    location: []
  },
  onLoad() {
    let localData = stationData.station;
    this.setData({
      station: localData
    })
  },
  // 选择起点
  choseAddress(e) {
    let lineMask = this.data.lineMask;
    let sType = e.currentTarget.dataset.type;

    this.setData({
      lineMask: !lineMask
    })

    if (sType == 'origin') {
      this.setData({
        oType: 'origin'
      })
    } else if (sType == 'end') {
      this.setData({
        oType: 'end'
      })
    }
  },
  bindQuery() {
    let location = this.data.location;
    if (!location.origin) {
      this.showModal('请选择起点')
      return;
    } else if (!location.end) {
      this.showModal('请选择终点')
      return;
    } else {
      wx.navigateTo({
        url: '/pages/query_view/index?origin=' + location.origin.location + '&end=' + location.end.location,
      })
    }
  },
  choseValue(e) {
    let name = e.currentTarget.dataset.name;
    let lat = e.currentTarget.dataset.lat;
    let lng = e.currentTarget.dataset.lng;
    let oType = this.data.oType;

    if (oType == 'origin') {
      this.setData({
        'location.origin.name': name,
        'location.origin.location': lat + ',' + lng,
        lineMask: false
      })
    }
    if (oType == 'end') {
      this.setData({
        'location.end.name': name,
        'location.end.location': lat + ',' + lng,
        lineMask: false
      })
    }
  },
  // 快捷菜单跳转
  toPage(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  showModal(c, t) {
    wx.showModal({
      title: t ? t : '提示',
      content: c,
      showCancel: false
    })
  },
  onShareAppMessage(e) {
    return {
      title: '东莞地铁信息',
      path: '/pages/metro/index'
    }
  }
})