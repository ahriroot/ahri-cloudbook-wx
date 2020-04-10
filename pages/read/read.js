import ajax from '../../service/ajax'

Page({

  data: {
    name: '',
    md: '',
    show: false,
    loading: false,
    catalogs: [],
    none: false
  },

  onLoad: function (options) {
    this.get_catalogs(options.id)
    this.setData({
      name: options.name
    })
  },

  showModal(e) {
    this.setData({
      show: true
    })
  },

  hideModal(e) {
    this.setData({
      show: false
    })
  },

  get_catalogs: function (id) {
    this.setData({
      loading: true
    })
    ajax({
      url: `/index/notebook/catalog/${id}`
    }).then(res => {
      if (res.data.data.length <= 0) {
        this.setData({
          none: true
        })
        return
      }
      this.setData({
        catalogs: this.getList(res.data.data)
      })
      this.read({
        currentTarget: {
          dataset: {
            id: res.data.data[0].id
          }
        }
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

  read: function (e) {
    this.setData({
      loading: true,
      show: false
    })
    ajax({
      url: `/index/notebook/content/${e.currentTarget.dataset.id}`
    }).then(res => {
      this.setData({
        md: res.data.data.content,
        loading: false
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  },

  getList: function(data, pid) {
    let tmp = []
    data.forEach(item => {
      if (item.parent == pid){
        tmp.push(item)
        tmp = tmp.concat(this.getList(data, item.id))
      }
    })
    return tmp
  }
})