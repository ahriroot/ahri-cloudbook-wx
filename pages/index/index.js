import ajax from '../../service/ajax'

Page({

  data: {
    books: [],
    loading: false,
    page: 0,
    next: '/index/notebook/book'
  },

  onLoad: function (options) {
    this.get_books()
  },

  get_books: function () {
    if (!this.data.next) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      loading: true
    })
    ajax({
      url: `/index/notebook/book/?page=${++this.data.page}`
    }).then(res => {
      let books = []
      this.data.books.forEach(book => {
        books.push(book)
      })
      res.data.results.forEach(book => {
        books.push(book)
      })
      this.setData({
        books: books,
        next: res.data.next
      })
      this.setData({
        loading: false
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  },

  toRead: function (val) {
    let book = val.currentTarget.dataset.val
    wx.navigateTo({
      url: `/pages/read/read?id=${book.id}&name=${book.name}`,
    })
  }
})