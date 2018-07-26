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
  // 调换站点
  reversalStaion(){
    console.log('a')
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
  // 快捷菜单跳转
  toPage(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  onShareAppMessage(e) {
    return {
      title: '东莞地铁信息',
      path: '/pages/metro/index'
    }
  }
})