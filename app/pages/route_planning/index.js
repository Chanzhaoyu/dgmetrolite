Page({
  data: {
    origin: ['23.02067', '113.75179', '', ''],
    destination: ['23.01663', '113.75946', '东莞会展国际大酒店', '广东省东莞市中心会展北路']
  },
  onLoad: function(options) {
    // if (options && options != '') {
    //   this.setData({
    //     origin: options.origin.split(','),
    //     destination: options.end.split(',')
    //   })
    // }
  },
  onReady: function() {
    let origin = this.data.origin;
    let destination = this.data.destination;

    let url = 'https://restapi.amap.com/v3/direction/transit/integrated';
    let data = {
      origin: origin[1] + ',' + origin[0],
      destination: destination[1] + ',' + destination[0],
      city: '东莞',
      key: '27d1827d9e2e058bb05132878f18cffb'
    };

    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
      }
    })

  }
})