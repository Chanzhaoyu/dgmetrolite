let stationData = require('../../utils/station_data.js');

Page({
  data: {
    bannerUrls: [
      '/static/images/logo_01.png'
    ],
    tabIndex: 0,
    /*站点遮罩数据*/
    stationName: '东莞火车站',
    stationKey: 0,
    modalFlag: true,
    lineIndex: 0
  },
  onLoad(options) {
    let localData = stationData.station;
    this.setData({
      station: localData
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
    let en_name = e.currentTarget.dataset.en;
    wx.openLocation({
      name: name,
      address: en_name,
      latitude: lat,
      longitude: lon,
      scale: 24
    })
  },
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
  // 线路切换
  lineBind(e) {
    this.setData({
      lineIndex: e.currentTarget.dataset.index
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
  onShareAppMessage(e) {
    return {
      title: '东莞地铁信息',
      path: '/pages/metro/index'
    }
  }
})