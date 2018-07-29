var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    markers: [],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function(options) {
    var that = this;

    var key = config.Config.key;

    var oPosition = wx.getStorageSync('chooseData');

    var markers = [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: oPosition.sLat,
      longitude: oPosition.sLng,
      width: 23,
      height: 33
    }, {
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: oPosition.eLat,
      longitude: oPosition.eLng,
      width: 24,
      height: 34
    }];

    that.setData({
      sLng: oPosition.sLng,
      sLat: oPosition.sLat,
      markers: markers
    })

    var myAmapFun = new amapFile.AMapWX({
      key: key
    });

    myAmapFun.getTransitRoute({
      origin: oPosition.sLng + ',' + oPosition.sLat,
      destination: oPosition.eLng + ',' + oPosition.eLat,
      city: '东莞',
      success: function(data) {
        if (data && data.transits) {
          var transits = data.transits;
          console.log(data)
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                if (j !== 0) {
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });
      },
      fail: function(info) {

      }
    })

  }
})