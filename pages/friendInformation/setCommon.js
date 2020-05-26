// pages/friendInformation/setCommon.js
import { API_HOST, API_EDIT_RENAME, API_UPDATE_FRIEND, API_DEL_FRIEND, API_DEL_MESSAGE, API_MESSAGE_REMAIN_NUM } from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commVal:'',
    friendId:'',
    friendName: ''
  }, 
  onCloseOpens() {
    wx.navigateBack({
      delta:1
    })
  },
  changhuifu(){
    this.setData({
      commVal:this.data.friendName
    })
  },
  changCommtwo(){
    this.setData({
      commVal: this.data.friendName
    })
  },
  changclear(){
    this.setData({
      commVal:''
    })    
  },
  changComm(e) {
    console.log(e)
    let _this = this;
    _this.setData({
      commVal: e.detail
    })
  },
  okCommt() {
    if (this.data.commVal != '') {
      this.onEditName()
      // this.setData({
      //   isOpens: false,
      //   commVal:''
      // })
    } else {
      this.setData({
        isOpens: false,
      })
    }
  },
  // 更新备注
  onEditName() {
    let _this = this;
    wx.request({
      url: `${API_HOST}${API_EDIT_RENAME}`,
      method: "Post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendId: _this.data.friendId,
        remark: _this.data.commVal,
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: "更新成功",
            icon: 'none',
            success: () => {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
                prevPage.setData({
                  remarkname: _this.data.commVal,
                  commVal: '',
                }, () => {
                  wx.navigateBack({
                    delta: 1
                  })
                })
            }
          })
        } else if (res.data.code === 50001) {
          // _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      commVal: options.remarkname != 'null' ? options.remarkname : '',
      friendId: options.friendID,
      friendName: options.friendName
    })
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