let stationData = require('../../utils/station_data.js');

Page({

  data: {
    bannerUrls: [
      '/static/images/banner_01.jpg'
    ],
    line:['2号线'],
    key: 0,
    tabIndex: 0
  },
  onLoad(options) {
    let localData = stationData.station;
    let filterStation = [];
    // 站点数组
    for (let i = 0; i < localData.length; i++) {
      filterStation.push(localData[i].name);
    }
    this.setData({
      station: localData,
      filterStation: filterStation
    })
  },
  bindPickerChange(e) {
    this.setData({
      key: e.detail.value
    })
  },
  tabChange(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  toStation(e) {
    let lat = parseFloat(e.currentTarget.dataset.lat);
    let lon = parseFloat(e.currentTarget.dataset.lon);
    let name = e.currentTarget.dataset.name;
    wx.openLocation({
      name: name,
      latitude: lat,
      longitude: lon,
      scale: 24
    })
  },
  viewLine(e){
    let imgUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [imgUrl]
    })
  },
  onShareAppMessage(e) {
    return {
      title: '东莞地铁信息',
      path: '/pages/index/index'
    }
  }
})