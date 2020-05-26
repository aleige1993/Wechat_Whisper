// pages/personal/portrait/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgwidth:0,
    ischange:true,
    showActionsheet:true,
    groups:[{
      text:'拍照',
      value:1
    },
    {
      text:'手机相册选择',
      value:2
    }
  ],
  tempFilePaths:'/assets/images/tabs/jiaren.png'
  },
  chooseImage(sourceType){
    let _this = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: [sourceType],
      success:(res)=>{
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          tempFilePaths:tempFilePaths[0]
        })
      },
      fail:(err)=>{
        console.log(err)
      },
      complete: (com) => {
        _this.setData({
          ischange:true
        })
      },
    })
  },
  bindactiontap(e){
    console.log(e)
    let ind = e.detail.value;
    if(ind == 1){
      this.chooseImage('camera')
    }else{
      this.chooseImage('album')
    } 
  },
  bindclose(e){
    this.setData({
      ischange: true
    })
  },
  changimg(){
    this.setData({
      ischange: !this.data.ischange
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgwidth: wx.getSystemInfoSync().windowWidth
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