import ajax from '../../service/ajax'

Page({

  data: {
    books: [],
    show: false,
    username: '',
    password: '',
    loading: false
  },

  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        show: true
      })
    } else {
      this.get_books()
    }
  },

  bindKeyInput: function (e) {
    this.setData({
      [e.target.id]: e.detail.value
    })
  },

  get_books: function () {
    this.setData({
      loading: true
    })
    ajax({
      url: '/admin/notebook/book/'
    }).then(res => {
      if (res.data.code === 0) {
        this.setData({
          show: true
        })
      } else {
        this.setData({
          books: res.data.data
        })
      }
      this.setData({
        loading: false
      })
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
        duration: 2000
      })
      this.setData({
        loading: false
      })
    })
  },

  cancel: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  login: function () {
    this.setData({
      loading: true
    })
    ajax({
      url: '/login/',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 200) {
        wx.setStorageSync('token', res.data.data.token)
        this.setData({
          show: false
        })
        this.get_books()
      } else {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      }
      this.setData({
        loading: false
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  },

  exit: function () {
    wx.removeStorageSync('token')
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  toRead: function (val) {
    let book = val.currentTarget.dataset.val
    wx.navigateTo({
      url: `/pages/read/read?id=${book.id}&name=${book.name}`,
    })
  }
})