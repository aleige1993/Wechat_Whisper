// pages/webView/index.js
import { API_HOST } from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yes:'https://mp.weixin.qq.com/s/4MZcraUJ0rElwO461WhIYA',
    nos:'',
    isguanzhu:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  isGuanzhu(){
    let _this = this
    wx.request({
      url: `${API_HOST}/user/judgeIsFollow`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: function success(res) {
        if(res.data.code == 0){
          _this.setData({
            isguanzhu: res.data.data
          })
        }
      },
      fail: function fail() {
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isGuanzhu()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})