// pages/signin/index.js
import { API_HOST, API_BIND_FRIEND, API_QUERY_NOTICE, API_QUERY_USER_MESSAGE } from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop: 0,
    systeminfo: {},
    noticeNumberData: {
      messageCount: 0,
      messageNumCount: 0
    },
    topMessageList: [],
    notTopMessageList: [],
    userId:''
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
          var topMessageList = [];
          var notTopMessageList = [];
          var messageList = res.data.messageList;
          messageList.forEach(function (v) {
            v.publishTime =  _this.formatDate(v.publishTime) 
            if (v.isTop) {
              topMessageList.push(v);
            } else {
              notTopMessageList.push(v);
            }
          });
          _this.setData({
            topMessageList: topMessageList,
            notTopMessageList: notTopMessageList
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
    let _this = this;
    this.setData({
      userId: wx.getStorageSync('userId')
    }, () => {
      _this.queryUserMessage();
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
    return {
      title: "定时悄悄话",
      path: '/pages/signin/index?userId=' + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/sharePng.png",
      success: function success(res) {
        // Taro.showToast({
        //   title: '/pages/signin/index?userId=' + Taro.getStorageSync('userId'),
        //   icon: 'none'
        // })
      }
    };
  }
})