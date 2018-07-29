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

    // let page = '/pages/route_planning/index?origin=';
    // let url = sOrigin.lat + ',' + sOrigin.lng + ',' + sOrigin.name + ',' + sOrigin.address + '&end=' + sEnd.lat + ',' + sEnd.lng + ',' + sEnd.name + ',' + sEnd.address
    // console.log(page + url);
    // wx.navigateTo({
    //   url: page + url,
    // })

    let chooseData = {
      sLng: sOrigin.lng,
      sLat: sOrigin.lat,
      eLng: sEnd.lng,
      eLat: sEnd.lat
    }

    wx.setStorage({
      key: 'chooseData',
      data: chooseData,
      success: function() {
        wx.navigateTo({
          url: '/pages/navigation_bus/index',
        })
      }
    })
  },
  // 调换站点
  reversalStaion() {
    let sStart = this.data.location.origin;
    let sEnd = this.data.location.end;
    if(!sStart || !sEnd){
      wx.showModal({
        title: '提示',
        content: '请选择目的地',
        showCancel: false
      })
      return;
    }
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
  // 附近站点
  earbyStation(e) {
    let that = this;
    let nLatitude, nLongitude;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        nLatitude = res.latitude;
        nLongitude = res.longitude;
        that.setData({
          'markers[0].latitude': nLatitude,
          'markers[0].longitude': nLongitude
        })
        wx.request({
          url: 'https://restapi.amap.com/v3/place/around',
          data: {
            location: nLongitude + ',' + nLatitude,
            keywords: '地铁站',
            sortrule: 'distance',
            offset: 5,
            key: "27d1827d9e2e058bb05132878f18cffb"
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            if (res && res.data.pois) {
              let mapData = res.data.pois;
              let location = (mapData[0].location).split(',');
              console.log(res)
              wx.openLocation({
                latitude: parseFloat(location[1]),
                longitude: parseFloat(location[0]),
                scale: 18,
                name: mapData[0].name,
                addrsss: mapData[0].address
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '附近没有地铁站',
              })
            }
          }
        })
      }
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