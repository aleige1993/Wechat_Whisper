// pages/trends/trends/photoAlbum/index.js
import { API_HOST} from '../../../utils/config.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:100,
    iscorlor:false,
    windowHeight:0,
    userId:'',
    xclist:[]
  },
  getQueryAmon(id){
    let _this = this;
    wx.request({
      url: `${API_HOST}/dynamic/queryAlbum`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        userId:id
      },
      success:function(res){
        console.log(typeof res.data.data)
        
        _this.setData({
          xclist:res.data.data
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  addwenz(){
    wx.navigateTo({
      url: '/pages/trends/article/index',
    })
  },
  godetail(e){
    console.log(e)
    let id = e.currentTarget.dataset.item

    wx.navigateTo({
      url: '/pages/trends/trendDetails/index?dynamicId='+id+'&tite=1',
    })
  },
  chakantupian(e){
    console.log(e)
    let  list = e.currentTarget.dataset.item
    wx.previewImage({
      current: list[0],  
      urls: list
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
    // setTimeout(()=>{
    //   _this.setData({
    //     scrollTop:100
    //   })
    // })
    let _this = this;
    wx.getSystemInfo({
      success:function (res){
        _this.setData({
          windowHeight:res.windowHeight
        })
      }
    })
    if(options){
      let id = options.userid
      this.setData({
        userId:id
      })
      this.getQueryAmon(id)
    }
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
    if(this.data.userId){
      this.getQueryAmon(this.data.userId)
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
  onShareAppMessage: function () {
    return {
      title: "有什么想说的 可以悄悄说了",
      path: "/pages/whisper/whisperHome/index?userId=" + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/logo7.png",
    };
  }
})