// pages/trends/trendDetails/index.js
import { API_HOST} from '../../../utils/config.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movedynamicId:'',
    types:1,
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
    inputname:'',
    inputNO:1,
    comlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    console.log(options)
    if(options){
      let types = options.tite
      if(types == 1){
        wx.setNavigationBarTitle({
          title: '相册详情'
        })
      }else{
        wx.setNavigationBarTitle({
          title: '新消息'
        })
      }
      let dynamicId = options.dynamicId
      this.setData({
        dynamicId,
        movedynamicId:dynamicId,
        types: types ? types:2
      },()=>{
        _this.getqueryNotice(dynamicId)
      })
    }
  },
  //  获取详情 POST /api/dynamic/queryNoticeDynamic

  getqueryNotice(id){
    let _this = this;
    wx.request({
      url: `${API_HOST}/dynamic/queryNoticeDynamic`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        dynamicIds:id
      },
      success:function(res){
        let _data = res.data.data
        _data.map((item,index)=>{ 
            item.isshowA = false; 
            item.isshowB = false; 
        })
        _this.setData({
          list: _data
        })
      },
      fail:function(err){
        console.log(err)
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
        let ids = _this.data.types == 1 ? _this.data.dynamicId: _this.data.movedynamicId
        _this.setData({
          isinpout:false,
          motai:false
        })
        _this.getqueryNotice(ids)
      },
      fail:function(err){
        console.log(err) 
      }
    })
  },
  //评论
  dianpinglun(e){
    let _this = this;
    let index = e.currentTarget.dataset.indx
    let id = e.currentTarget.dataset.item
    let list = e.currentTarget.dataset.list
    let key = `list[${index}].isshowA`
    let inputname = `评论${list.friendRemarkName?list.friendRemarkName:list.friendName}:`
    this.setData({
      inputname: inputname,
      isinpout:true,
      pinglunid:id,
      [key]:false,
      isfocus:true,
      commentUserId:'',
      dynamicId:id
    })
  },
  //点击回复
  dianhuifu(e){
    let _this = this;
    let index = e.currentTarget.dataset.indx
    let id = e.currentTarget.dataset.item
    let list = _this.data.comlist
    let key = `list[${index}].isshowA`
    let key2 = `list[${index}].isshowB`
    let inputname = `回复${list.commentUserRemarkName?list.commentUserRemarkName:list.commentUserName}:`
    console.log('id', id)
    this.setData({
      dynamicId:id,
      inputname: inputname,
      inputNO:2,
      isinpout:true,
      pinglunid:id,
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
          if(res.data.code == 0){
            let ids = _this.data.types == 1 ? _this.data.dynamicId: _this.data.movedynamicId
              console.log('types', _this.data.types)
              console.log('ids', ids)
              _this.getqueryNotice(ids)
              _this.setData({
                strInput:'',
                motai:false
              })
          }else if (res.data.code == 500 || res.data.code == 400) {
            console.log(1111)
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
        }  
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
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
    return {
      title: "有什么想说的？可以悄悄说了！",
      path: "/pages/tellsPeople/index",
      imageUrl: "/assets/images/common/logo7.png",
    };
  }
})