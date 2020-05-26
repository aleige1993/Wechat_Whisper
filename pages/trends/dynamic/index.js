// pages/trends/dynamic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:50,
    iscorlor:false,
    isfocus:false,
    reasonHeight:0

  },
  bindfocusDialog(event) {
    let vm = this;
    vm.setData({
      reasonHeight: event.detail.height || 0
    })
  },  
  hideinpout(){
    this.setData({
      isfocus:false,
      reasonHeight:0
    })
  },
  clickshowinput(){
    this.setData({
      isfocus:true
    })
  },
//   imageLoad: function(e) {
//     var $width=e.detail.width,    //获取图片真实宽度
//         $height=e.detail.height,
//         ratio=$width/$height;    //图片的真实宽高比例
//     var viewWidth=200,           //设置图片显示宽度，左右留有16rpx边距
//         viewHeight=200/ratio;    //计算的高度值
//      var image=this.data.imagesinfos; 
//      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
//      image[e.target.dataset.index]={
//         width:viewWidth,
//         height:viewHeight
//      }
//      this.setData({
//         imagesinfos:image
//      })
//  },
  bainse(ev){
    let top = ev.detail.scrollTop
    if(top > 150){
      this.setData({
        iscorlor:true
      })
    }else{
      this.setData({
        iscorlor:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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