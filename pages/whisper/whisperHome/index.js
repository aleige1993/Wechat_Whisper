// pages/whisper/whisperHome/index.js
import { API_HOST, API_BIND_FRIEND, API_QUERY_NOTICE, API_QUERY_USER_MESSAGE } from '../../../utils/config.js'
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
  isshow:true,
  paddingTop: 0,
  systeminfo: {},
  noticeNumberData: {
    messageCount: 0,
    messageNumCount: 0
  },
  topMessageList: [],
  notTopMessageList: [],
  userId:'',
  messageList:[],
  autoClose:true,
  isClearOpened:false,
  friendid:'',
  ToalNumberData:''
  },
  onButtonClick(e) {
    console.log(e)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/message/index?friendID=${item.friendid}&friendName=${item.friendname}&imgUrl=${item.imgurl}&sex=${item.sex}&remarkname=${item.remarkname}&itemlist=${JSON.stringify(item)}`
    })
  },
  onActionClose() {
    this.setData({
      isClearOpened: false
    })
  },
  PDtype(t){
    if(t.includes('.mp3')){
      return '[语音]'
    }else if(t.includes('.png') || t.includes('.jpg') || t.includes('.gif') ||t.includes('.jpeg')){
      return '[图片]'
    }else{
      return t
    }
  },
  gotopyq(){
    wx.navigateTo({
      url: '/pages/trends/dynamic/index',
    })
  },
//点击显示切换
  onShowPyq(){
   this.setData({
    isshow: !this.data.isshow
   }) 
  },
  onCloses(e){
    console.log('onCloses', e)
    let _this = this
    // let typs = e.detail.value.text
    let indx = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let list = this.data.messageList
    let right = "messageList["+ indx +"].right"
    _this.setData({
      [right]: item.istop == 1? _this.data.right1:_this.data.right3
    })
  },
  deleteMessage(){
    let _this =  this
    wx.request({
      url: `${API_HOST}/deleteMessage`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data:{
        friendID: _this.data.friendid
      },
      success: res => {
        if(res.data.code == 0){ 
          _this.queryUserMessage()
          _this.setData({
            isClearOpened: false
          })
        }
      }
    })
  },
  onClick(e){
    console.log('onClick', e)
    let _this = this
    let typs = e.detail.value.text
    let indx = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let list = this.data.messageList
    if(typs ==  '取消置顶'){
      wx.request({
        url: `${API_HOST}/friend/cancelTop`,
        method: "POST",
        header: {
          token: wx.getStorageSync('token')
        },
        data:{
          id:item.friendid
        },
        success: res => {
          if(res.data.code == 0){
            console.log(res)
            _this.queryUserMessage()
          }
        }
      })
    }else if(typs ==  '置顶消息'){
      wx.request({
        url: `${API_HOST}/friend/topFriend`,
        method: "POST",
        header: {
          token: wx.getStorageSync('token')
        },
        data:{
          id:item.friendid
        },
        success: res => {
          if(res.data.code == 0){
            _this.queryUserMessage()
          }
        }
      })
    }else if(typs ==  '删除'){
      let key = "messageList["+ indx +"].istop"
      let right = "messageList["+ indx +"].right"
      _this.setData({
        isClearOpened:true,
        friendid:item.friendid
      })
    }else if(typs ==  '确定删除'){
      wx.request({
        url: `${API_HOST}/deleteMessage`,
        method: "POST",
        header: {
          token: wx.getStorageSync('token')
        },
        data:{
          friendID:item.friendid
        },
        success: res => {
          if(res.data.code == 0){ 
            _this.queryUserMessage()
          }
        }
      })
    }
  },
  onItemClick(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/message/index?friendID=" + item.friendid + "&friendName=" + item.friendname + "&imgUrl=" + item.imgurl + "&sex=" + item.sex+"&remarkname="+item.remarkname
    });
  },
  formatDate(time) {
    let now = new Date(time)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  },
  queryUserMessage() {
    var _this = this;
    wx.request({
      url: API_HOST + "/queryUserMessage",
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: function success(res) {
        if (res.data.code == 0) {
          var messageList = res.data.messageList;
          messageList.forEach(function (v) {
            v.publishTime =  _this.timed(v.publishTime)
            v.lastMessageContent = _this.PDtype(v.lastMessageContent)
             if(v.istop == 1){
               v.right = _this.data.right1
             }else if(v.istop == 2){
              v.right = _this.data.righ2
             }else{
               v.right = _this.data.right3
             }
          });
          _this.setData({
            messageList
          });
        }else{
          _this.showLoginModal()
          // wx.navigateTo({
          //   url: '/pages/login/index',
          // })
        }
      },
      fail: function fail() {
        wx.showToast({
          title: '获取消息失败', 
          icon: 'none'
        })
      }
    });
  },
  //处理时间
  timed(time) {
    var timeStr = time + '';
    return timeStr.slice(0, 4) + '年' + timeStr.slice(4, 6) + '月' + timeStr.slice(6, 8) + '日 ' + timeStr.slice(8, 10) + ':' + timeStr.slice(10, 12);
  },
  queryNotice() {
    var _this = this;
   wx.request({
      url: API_HOST + "/queryNotice",
      method: "POST",
      header: {
        token:wx.getStorageSync('token')
      },
      success: function success(res) {
        if (res.data.code == 0) {
          _this.setData({
            noticeNumberData: res.data.data
          });
        } else if (res.data.code === 50001) {
          wx.clearStorageSync();
          _this.login(function (data) {
            wx.setStorageSync('token', data.token);
            wx.setStorageSync('userId', data.userId);
            _this.queryNotice();
            _this.queryUserMessage();
          });
        }
      }
    });
  },
  showLoginModal() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '你还未登录，登录后可获得完整体验 ',
      confirmText: '一键登录',
      success: function success(res) {
        // 点击一键登录，去授权页面
        if (res.confirm) {
          if (_this.data.userId) {
            wx.navigateTo({
              url: "/pages/login/index?userId=" + _this.data.userId
            });
          } else {
            wx.navigateTo({
              url: "/pages/login/index"
            });
          }
        }
      }
    });
  },
  getNoticeToal(){
    let _this = this;
    wx.request({
      url: API_HOST + "/dynamic/queryNoticeTotal",
      method: "GET",
      header: {
        token:wx.getStorageSync('token')
      },
      success: function success(res) {
        console.log(res)
        if (res.data.code == 0) {
          _this.setData({
            ToalNumberData: res.data.data
          });
        }
      }
    })
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
    let _this = this;
    // this.getNoticeToal()
    // this.getTabBar().setData({
    //   ToalNumberData: _this.data.ToalNumberData
    // })
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
      // ToalNumberData: _this.data.ToalNumberData
    })
  }
  this.setData({
    userId: wx.getStorageSync('userId')
  }, () => {
    _this.queryUserMessage();
  })
  _this.getNoticeToal()
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
      path: "/pages/whisper/whisperHome/index?userId=" + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/logo7.png",
    };
  }
})