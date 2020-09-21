// pages/musicList/musicList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [],
    listInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("musicList:",options)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      const {tracks,coverImgUrl,name} = res.result.playlist
      this.setData({
        musicList: tracks,
        listInfo: {
          coverImgUrl: coverImgUrl,
          name: name
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },

  _setMusiclist(){
    wx.setStorageSync('musiclist',this.data.musicList)
  }
})