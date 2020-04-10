export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://ahriknow.ahriknow.com' + options.url,
      method: options.method || 'get',
      header: {
        token: wx.getStorageSync('token')
      },
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}