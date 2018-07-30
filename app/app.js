//app.js
App({
  onLaunch: function () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let lat = res.latitude;
        let lng = res.longitude;

        wx.setStorage({
          key: 'location',
          data: {
            lat: lat,
            lng: lng
          },
        })

      },
      fail: (info) => {
        console.log(info);
      }
    })

  },
  globalData: {
  }
})