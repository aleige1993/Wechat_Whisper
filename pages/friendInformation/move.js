// pages/friendInformation/move.js
import { API_HOST, API_EDIT_RENAME, API_UPDATE_FRIEND, API_DEL_FRIEND, API_DEL_MESSAGE, API_MESSAGE_REMAIN_NUM } from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isreject:false,
    options:null,
    userAdmin:1,
    paddingTop: 0,
    systeminfo: {},
    top: false,
    refuse: false,
    isOpened: false,
    isClearOpened: false,
    isDeleteOpened: false,
    isRejectOpened: false,
    id: "",
    sex: "",
    imgurl: "",
    friendname: "",
    intimateid: "",
    friendid: "",
    count: 0,
    isOpens: false,
    commVal:'',
    isDone:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let jsonopet = JSON.parse(options.options) 
    if(jsonopet){ 
     this.setData({
      userid: jsonopet.userid,
      friendid: jsonopet.friendid,
      friendname: jsonopet.friendname,
      remarkname:jsonopet.remarkname,
      id: jsonopet.id,
      imgurl: jsonopet.imgurl,
      intimate: jsonopet.intimate,
      intimateid: jsonopet.intimateid,
      isreject: jsonopet.isreject == 1 ? true : false,
      istop: jsonopet.istop == 1 ? true : false,
      sex: jsonopet.sex,
      commVal: jsonopet.remarkname != "null" ? jsonopet.remarkname : '',
      itemlist: JSON.parse(jsonopet.itemlist)  
     })
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

  },
  onSwitchChange(e) {
    let _this = this;
    this.setData({
      istop: e.detail
    },()=>{
      _this.updateFriend();
    })
  },
  rejectFriend(){
    let _this = this;
    this.setData({
      isreject: true,
      isRejectOpened:false
    }, () => {
      _this.updateFriend();
    })
  },
  onSwitchReject(e){
    let _this = this;
    if (e.detail){
      this.setData({
        isRejectOpened:true
      })
    }else{
      this.setData({
        isreject: e.detail
      }, () => {
        _this.updateFriend();
      })
    } 
  },
  onActionCancel() {
    this.setData({
      isOpened: false,
      isClearOpened: false,
      isDeleteOpened: false,
    })
  },

  onActionClick() {
    let _this = this;
    this.setData({
      isOpened: false
    })
    _this.updateFriend({
      istop: this.state.top,
      isreject: !this.state.refuse
    }, () => {
      this.setData({
        refuse: !this.state.refuse
      })
    });
  },

  onClearMessage() {
    this.setData({
      isClearOpened: true
    })
  },

  onActionMsgClick() {
    this.setData({
      isClearOpened: false
    })
    this.deleteMessage();
  },

  onDeleteFriend() {
    this.setData({
      isDeleteOpened: true
    })
  },

  onActionDeleteClick() {
    this.setData({
      isDeleteOpened: false
    })
    this.deleteFriend();
  },

  onButtonClick() {
    wx.navigateTo({
      url: `/pages/message/index?friendID=${this.data.friendid}&friendName=${this.data.friendname}&imgUrl=${this.data.imgurl}&sex=${this.data.sex}&remarkname=${this.data.remarkname}&itemlist=${JSON.stringify(this.data.itemlist)}`
    })
  },

  onActionClose() {
    this.setData({
      isClearOpened: false,
      isDeleteOpened: false,
      isOpened: false,
      isRejectOpened: false
    })
  },
  updateFriend() {
    const { id, intimateid, friendid } = this.data;
    wx.request({
      url: `${API_HOST}${API_UPDATE_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: id,
        intimateid: intimateid,
        istop: this.data.istop ? 1 : 0,
        isreject: this.data.isreject ? 1 : 0,
        friendid: friendid
      },
      success: res => {
        if (res.data.code === 0) {
        } else if(res.data.code === 50001){
          _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  deleteFriend() {
    let _this =this
    wx.request({
      url: `${API_HOST}${API_DEL_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: this.data.id
      },
      success: res => {
        if (res.data.code === 0) {
          wx.navigateBack({
            delta: 1
          })
        } else if(res.data.code === 50001){
          _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  deleteMessage() {
    let _this = this;
    wx.request({
      url: `${API_HOST}${API_DEL_MESSAGE}`,
      method: "Post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.friendid
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: "清空成功",
            icon: 'none',
            success:()=>{
              _this.setData({
                isClearOpened: false
              })
            }
          })
        }else if(res.data.code === 50001){
          _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})