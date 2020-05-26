import { API_HOST, API_FRIEND_QUERYFRIENDS, API_NEAR_FRIEND} from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "searchValue": "",
    list: [],
    "isSearch": false,
    "isShowBg": false,
    "searchData": [],
    nearFriend: [],
    "data": [],
    "couples": false,
    "anonymousState__temp": "height:603px;width:375px",
    "anonymousState__temp2": null,
    "anonymousState__temp3": "/assets/images/common/right.png",
    "loopArray2": []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryFriends()
    this.nearFriend()
  },
  //获取朋友
  queryFriends() {
    var _this = this;
    wx.request({
      url: `${API_HOST}${API_FRIEND_QUERYFRIENDS}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: function success(res) {
        console.log(res.data)
        let data = []
        if (res.data.code == 0) {
          let list = res.data.friends;
          list.map((item)=>{
            item.isShow = false
            if (item.friendList.length>0){
              item.friendList.map((v)=>{
                data.push(v) 
              })  
            }
          })
          _this.setData({
            list: list,
            data: data
          });
        }else{
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }
      }
    });
  },
  onChooseNew(){
    wx.navigateTo({
      url: '/pages/chooseFriend/index'
    });
  },
  onShowItem(e){
    let index = e.currentTarget.dataset.index;
    let key = `list[${index}].isShow`
    this.setData({
      [key]: !this.data.list[index].isShow
    })
  },
  //获取经常联系人
  nearFriend() { 
    let _this = this
    wx.request({
      url: `${API_HOST}${API_NEAR_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: function success(res) {
        if (res.data.code == 0) {
          _this.setData({
            nearFriend: res.data.data
          });
        }
      }
    });
  },
  onItemClick(e) {
    let item = e.currentTarget.dataset.item;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      friendID: item.friendid,
      friendName: item.friendname,
      imgUrl: item.imgurl,
      sex: item.sex,
    });
    console.log(item);
    wx.navigateBack({
      delta: 1
    });
  },
  //搜索
  onSearch(event){
   let val = event.detail;
   if(val){
     this.setData({
       isSearch:true,
       searchValue:val
     },()=>{
       this.onActionClick()
     })
   }else{
     wx.showToast({
       title: '请输入关键词',
       icon:'none'
     })
   }
  },
  //取消
  onCancel(){
    this.setData({
      isSearch:false,
      searchValue:''
    })
  },
  onActionClick(){
    let val = this.data.searchValue
    let data = this.data.data
    let searchData = data.filter(function (v) {
      return v.friendname.indexOf(val.toLocaleLowerCase()) > -1;
    });
    this.setData({
      isSearch: true,
      searchData: searchData
    });
  },
  changSearch(e){
    let val = e.detail
    if(!val){
      this.setData({
        isSearch: false
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

  }
})