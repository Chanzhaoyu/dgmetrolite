let stationData = require('../../utils/station_data.js');

Page({
  data: {
    tabIndex: 0,
    /*站点遮罩数据*/
    stationName: '',
    stationKey: 0,
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
  // 线路预览
  viewLine(e) {
    let imgUrl = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [imgUrl]
    })
  },
  // 线路切换
  lineBind(e) {
    this.setData({
      lineIndex: e.currentTarget.dataset.index
    })
  },
  // 站点选中跳转
  toStationView(e) {
    let stationName = e.currentTarget.dataset.name;
    let stationKey = e.currentTarget.dataset.key;
    let stationLine = e.currentTarget.dataset.line;
    wx.navigateTo({
      url: '/pages/station_view/index?name=' + stationName + '&key=' + stationKey + '&line=' + stationLine
    })
  },
  onShareAppMessage(e) {
    return {
      title: '东莞地铁出行',
      path: '/pages/line/index'
    }
  }
})