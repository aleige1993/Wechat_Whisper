// pages/trends/trends/photoAlbum/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:100,
    iscorlor:false,
    windowHeight:0
  },
  addwenz(){
    wx.navigateTo({
      url: '/pages/trends/article/index',
    })
  },
  godetail(){
    wx.navigateTo({
      url: '/pages/trends/trendDetails/index',
    })
  },
  chakantupian(){
    wx.previewImage({
      current: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590426806548&di=0111502a62b9985af40d703cf594eb2d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F25%2F20180425223308_8XyXV.thumb.700_0.jpeg',  
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590426806548&di=0111502a62b9985af40d703cf594eb2d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F25%2F20180425223308_8XyXV.thumb.700_0.jpeg','http://a1.att.hudong.com/05/00/01300000194285122188000535877.jpg','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1933773253,1879936497&fm=26&gp=0.jpg']
    })
  },
  gobank(){
    wx.navigateBack({
      delta: 1
    })
  },
  // bainse(ev){
  //   let top = ev.detail.scrollTop
  //   if(top > 150){
  //     this.setData({
  //       iscorlor:true
  //     })
  //   }else{
  //     this.setData({
  //       iscorlor:false
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onPageScroll: function (ev) {
    
    // this.setData({
    //   scrollTop: ev.scrollTop
    // })
  },
  onLoad: function (options) {
    let _this = this;
    wx.getSystemInfo({
      success:function (res){
        _this.setData({
          windowHeight:res.windowHeight
        })
      }
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
    let _this = this
    setTimeout(()=>{
      _this.setData({
        scrollTop:100
      })
    })
   
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