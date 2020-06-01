// pages/personal/portrait/index.js
import { API_HOST, API_CUSTOM_LIST, API_USER_INFO, API_FIND_FRIEND, API_BIND_FRIEND, API_QUERY_MESSAGE_LIST, API_UPLOAD_FILE, API_INSTER_MESSAGE } from '../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarurl:'',
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
  tempFilePaths:''
  },
  chooseImage(sourceType){
    let _this = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: [sourceType],
      success:(res)=>{
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          avatarurl:tempFilePaths[0]
        })
        wx.uploadFile({
          url: `${API_HOST}` + "/uploadFile",
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            token: wx.getStorageSync('token')
          },
          success: function success(uploadRes) {
            var url = JSON.parse(uploadRes.data).url;
            wx.request({
              url: `${API_HOST}` + "/user/update",
              method: "POST",
              data:{
                avatarUrl:url
              },
              header: {
                token: wx.getStorageSync('token')
              },
              success:function(res){
                console.log(res)
              }
            })
          }
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
    console.log(options.avatarurl)
    let avatarurl = options.avatarurl
    this.setData({
      imgwidth: wx.getSystemInfoSync().windowWidth,
      avatarurl:avatarurl
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