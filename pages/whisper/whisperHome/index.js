// pages/whisper/whisperHome/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right1: [{
      text: '取消置顶',
      style: 'background-color: #4C4C4C; color: #fff;font-size:30rpx;padding:0 20rpx',
  },
  {
      text: '删除',
      style: 'background-color: #E75E58; color: #fff;font-size:30rpx;padding:0 20rpx',
  }],
  right2: [{
    text: '确定删除',
    style: 'background-color: #E75E58; color: #fff;font-size:30rpx;padding:0 84rpx',
}],
right3: [{
  text: '置顶消息',
  style: 'background-color: #4C4C4C; color: #fff;font-size:30rpx;padding:0 20rpx',
},
{
  text: '删除',
  style: 'background-color: #E75E58; color: #fff;font-size:30rpx;padding:0 20rpx',
}],
  isshow:true
  },
//点击显示切换
  onShowPyq(){
   this.setData({
    isshow: !this.data.isshow
   }) 
  },
  onClick(e){
    console.log('onClick', e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    app.globalData.tabbarIndex = options.tabbarIndex
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }
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
  onShareAppMessage(){
    return {
      title: "定时悄悄话，沟通更温暖",
      path: "/pages/tellsPeople/index?userId=" + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/logo7.png",
    };
  }
})