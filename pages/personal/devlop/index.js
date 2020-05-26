// pages/personal/devlop/index.js
 
import { API_HOST, API_CUSTOM_LIST} from '../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    let _this = this;
    wx.request({
      url: `${API_HOST}${API_CUSTOM_LIST}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: function success(res) {
        let list = res.data.page.list
        if(res.data.code == 0){
          _this.setData({
            listData: list
          })
        }else{
          wx.showToast({
            title: '请求失败',
            icon:'none'
          })
        } 
      },
      fail: function fail() {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
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