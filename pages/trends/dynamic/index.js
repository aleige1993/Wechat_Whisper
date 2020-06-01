// pages/trends/dynamic/index.js
import { API_HOST} from '../../../utils/config.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',
    // scrollTop:200,
    iscorlor:false,
    isfocus:false,
    reasonHeight:0,
    ishuifu:false,
    motai:false,
    windowHeight:0,
    list:[],
    dynamicId:'',
    isinpout:false,
    motai:false,
    Aindex:0,
    Bindex:0,
    pinglunid:'',
    isfocus:false,
    commentUserId:'',
    strInput:'',
    isClearOpened:false,
    pageNum: 1,
    pageSize:1000,
    inputname:'',
    inputNO:1,
    comlist:''
  },
  gobank(){
    wx.navigateBack({
      delta: 1
    })
  },
  gosend(){
    wx.navigateTo({
      url: '/pages/trends/article/index',
    })
  },
  gotonewmsg(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/trends/trendDetails/index?dynamicId='+id,
    })
  },
  calerAll(){
   this.setData({
    motai:false
   })
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
  getDynamicList(){
      let _this = this;
      wx.request({
        url: `${API_HOST}/dynamic/list`,
        method: "POST",
        header: {
          token: wx.getStorageSync('token')
        },
        data: {
          pageNum:  _this.data.pageNum,
          pageSize: _this.data.pageSize
        },
        success:function(res){
          let _data = res.data.data
          _data.map((item,index)=>{ 
              item.isshowA = false; 
              item.isshowB = false;
          })
          _this.setData({
            list: _data
          },()=>{
            console.log('执行了')
          })
        },
        fail:function(err){
          console.log(err)
        }
      })
  },
  //未读通知  
  noNoticeTotal(){
    let _this = this;
    wx.request({
      url: `${API_HOST}/dynamic/queryNoticeTotal`,
      method: "GET",
      header: {
        token: wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 0){
          let total = res.data.data
          _this.setData({
            total:total
          })
        } 
      },
      fail:function(err){

      }
    })
  },
  showIsA(e){
    console.log(e)
    let index = e.currentTarget.dataset.indx
    let key = `list[${index}].isshowA`
    this.setData({
      [key]:true,
      Aindex:index,
      motai:true
  })
  },
  hideIsA(e){
    console.log(e)
    let index = e.currentTarget.dataset.indx
    let key = `list[${index}].isshowA`
    this.setData({
      [key]:false,
      isinpout:false
    })
  },
  calerAll(){
    let index = this.data.Aindex
    let key = `list[${index}].isshowA`
    let key2 = `list[${index}].isshowB`
    this.setData({
      motai:false,
      [key]:false,
      [key2]:false
    })
  },
  //点赞
  dianzhan(e){
    console.log(e)
    let _this = this;
    let index = e.currentTarget.dataset.indx
    let id = e.currentTarget.dataset.item
    wx.request({
      url: `${API_HOST}/dynamic/fabulous`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        dynamicId:id
      },
      success:function(res){
        _this.setData({
          isinpout:false,
          motai:false
        })
        _this.getDynamicList()
      },
      fail:function(err){
        console.log(err) 
      }
    })
  },
  //评论
  dianpinglun(e){
    console.log(e)
    let _this = this;
    let index = e.currentTarget.dataset.indx
    let id = e.currentTarget.dataset.item
    let list = e.currentTarget.dataset.list
    let key = `list[${index}].isshowA`
    let inputname = `评论${list.friendRemarkName?list.friendRemarkName:list.friendName}:`
    this.setData({
      inputname: inputname,
      isinpout:true,
      dynamicId:id,
      pinglunid:id,
      [key]:false,
      isfocus:true,
      commentUserId:''
    })
  },
  //点击回复
  dianhuifu(e){
    let _this = this;
    let index = e.currentTarget.dataset.indx
    let id = e.currentTarget.dataset.item
    let list = _this.data.comlist
    console.log(list)
    let key = `list[${index}].isshowA`
    let key2 = `list[${index}].isshowB`
    let inputname = `回复${list.commentUserRemarkName?list.commentUserRemarkName:list.commentUserName}:`
    this.setData({
      inputname: inputname,
      isinpout:true,
      pinglunid:id,
      dynamicId:id,
      [key]:false,
      [key2]:false,
      isfocus:true
    })
  },
  hideinpout(){
    this.setData({
      isinpout:false
    })
  },
  chakantupian(e){
    let  list = e.currentTarget.dataset.item
    let i =  e.currentTarget.dataset.index
    wx.previewImage({
      current: list[i],  
      urls: list
    })
  },
  gethuofu(e){
    let i =  e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.comid
    let list = e.currentTarget.dataset.list
    console.log('gethuofu', list)
    let key = `list[${i}].isshowB`
    this.setData({
      [key]:true,
      motai:true,
      commentUserId:id,
      comlist:list
    })
  },
  //发送
  sendcomit(){
    let _this = this;
    if(_this.data.strInput ==  ''){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
    }else{
      wx.request({
        url: `${API_HOST}/dynamic/comment`,
        method: "POST",
        header: {
          token: wx.getStorageSync('token')
        },
        data: {
          "commentContent": _this.data.strInput,
          "commentedUserId": _this.data.commentUserId,
          "dynamicId": _this.data.dynamicId
        },
        success:function(res){
          _this.getDynamicList()
          _this.setData({
            strInput:'',
            motai:false
          })
        },
        fail:function(err){
          console.log(err) 
        }
      })
    } 
  },
  contionsInout(e){
    console.log(e)
    let _this = this;
    let val = e.detail.value
    _this.setData({
      strInput:val
    })
  },
  //
  huanqicel(e){
    let  id = e.currentTarget.dataset.id
    this.setData({
      isClearOpened:true,
      dynamicId:id
    })
  },
  onActionClose(){
    this.setData({
      isClearOpened:false
    })
  },
  //删除
  delmrsa(){ 
    let _this = this;
    wx.request({
      url: `${API_HOST}/dynamic/delete`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        "dynamicId": _this.data.dynamicId
      },
      success:function(res){
       if(res.data.code == 0){
        wx.navigateBack({
          delta: 1
        })
       }
      },
      fail:function(err){
        console.log(err) 
      }
    })
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
    setTimeout(()=>{
      wx.pageScrollTo({ 
        scrollTop:100,
        duration: 300
       })
    },800)
  },
  onItemClickToFriendInfo(e) {
    let item = e.currentTarget.dataset.item
    console.log('onItemClickToFriendInfo', item)
    wx.navigateTo({
      url: `/pages/friendInformation/index?userAdmin=1&userid=${item.userId}&id=0&friendid=${item.friendId}&imgurl=${item.friendAvatar}&friendname=${item.friendName}&remarkname=${item.friendRemarkName}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}&itemlist=${JSON.stringify(item)}`
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
    this.getDynamicList()
    this.noNoticeTotal()
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
    this.getDynamicList();
    this.noNoticeTotal()
    setTimeout(()=>{
      wx.stopPullDownRefresh() 
    },1000)
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