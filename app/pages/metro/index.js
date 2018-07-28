Page({
  data: {
    bannerUrls: [
      '/static/images/logo_01.png'
    ]
  },
  onLoad() {

    let that = this;

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let lat = res.latitude;
        let lng = res.longitude;

        that.setData({
          'location.origin.lat': lat,
          'location.origin.lng': lng,
          'location.origin.name': '',
          'location.origin.address': ''
        })

      },
      fail: (info) => {
        console.log(info);
      }
    })

  },
  onReady() {

  },
  // 选择起点
  choseAddress(e) {
    let sType = e.currentTarget.dataset.type;
    let that = this;
    if (sType && sType == 'origin') {
      wx.chooseLocation({
        success: (res) => {
          that.setData({
            'location.origin.lat': res.latitude,
            'location.origin.lng': res.longitude,
            'location.origin.name': res.name,
            'location.origin.address': res.address
          })
        },
        fail: (info) => {
          console.log(info)
        }
      })
    }
    if (sType && sType == 'end') {
      wx.chooseLocation({
        success: (res) => {
          that.setData({
            'location.end.lat': res.latitude,
            'location.end.lng': res.longitude,
            'location.end.name': res.name,
            'location.end.address': res.address,
          })
        },
        fail: (info) => {
          console.log(info)
        }
      })
    }
  },
  bindQuery() {

    let sOrigin = this.data.location.origin;

    let sEnd = this.data.location.end;

    if (!sEnd) {
      this.showModal('请选择终点！');
      return;
    }
    if (sOrigin.lat == sEnd.lat && sOrigin.lng == sEnd.lng) {
      this.showModal('起点和终点相同！')
      return;
    }

    let page = '/pages/route_planning/index?origin=';

    let url = sOrigin.lat + ',' + sOrigin.lng + ',' + sOrigin.name + ',' + sOrigin.address + '&end=' + sEnd.lat + ',' + sEnd.lng + ',' + sEnd.name + ',' + sEnd.address

    console.log(page + url);

    wx.navigateTo({
      url: page + url,
    })
  },
  // 调换站点
  reversalStaion() {
    let sStart = this.data.location.origin;
    let sEnd = this.data.location.end;
    this.setData({
      'location.origin': sEnd,
      'location.end': sStart
    })
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