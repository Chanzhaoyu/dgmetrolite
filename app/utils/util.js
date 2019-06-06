function getCommand(url, data = {}, success, fail) {
  wx.request({
    url: url,
    data: {},
    method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-Type': 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      if (res.statusCode == 200 && res.data != "") {
        success(res.data);
      }
    },
    fail: function (info) {
      fail(info)
    }
  })
}

module.exports = {
  getCommand: getCommand
}