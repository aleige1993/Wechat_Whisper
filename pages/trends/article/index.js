// pages/trends/article/index.js
import {
  API_HOST,
  API_QUERY_MESSAGE_LIST,
  API_UPLOAD_FILE,
  API_INSTER_MESSAGE,
  API_MODIFY_VOICE,
 API_FEEDBACK_ADDFEED
} from '../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagetype: 4,
    isbf: true,
    strInput:'',
    fileList:[],
    isDone:false,
    feedbackimg: [],
    strNum:0,
    localhost:''
  },
  // 获取地址
  getlocaltion(){
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        wx.chooseLocation({
          latitude:latitude,
          longitude:longitude,
          success: function(suc){
            _this.setData({
              localhost:suc.address
            })
          },
          fail:function(es){
            console.log(es)
            wx.showToast({
              title: '地址信息获取失败',
              icon: 'none'
            })
          }
        })
      }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changtypesas(e){
    console.log(e)
    let val = e.currentTarget.dataset.changes
    this.setData({
      msgTypes: val
    })
  },
  contionsInout(e){
    console.log(e)
    let _this = this;
    let val = e.detail.value
    _this.setData({
      strInput:val,
      strNum: e.detail.cursor
    },()=>{
      if (_this.data.strInput == '' && _this.data.feedbackimg.length == 0){
        _this.setData({
          isDone: false
        })
      }else{
        _this.setData({
          isDone: true
        })
      }
    })
  },
  afterRead(event) {
    let _this = this
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(file)
    file.map((item)=>{
      wx.uploadFile({
        url: `${API_HOST}${API_UPLOAD_FILE}`, // 仅为示例，非真实的接口地址
        filePath: item.path,
        name: 'file',
        header: {
          token: wx.getStorageSync('token')
        },
        success(res) {
          let data = JSON.parse(res.data)
          const { feedbackimg = [], fileList = [] } = _this.data;
          fileList.push({ ...item})
          feedbackimg.push(`${data.url}`);
          _this.setData({
            feedbackimg,
            isDone: true,
            fileList
          });
        },
        complete() {
        }
      }); 
    }) 
  },
  //删除图片
  delImgs(e) {
    console.log(e)
    let _this = this;
    _this.data.feedbackimg.splice(e.detail.index, 1)
    _this.data.fileList.splice(e.detail.index, 1)
    _this.setData({
      feedbackimg: _this.data.feedbackimg, 
      fileList: _this.data.fileList
    },()=>{
      if (_this.data.strInput == '' && _this.data.feedbackimg.length == 0){
        _this.setData({
          isDone: false
        })
      }else{
        _this.setData({
          isDone: true
        })
      }
    }) 
  },
  onDoen(){
    let _this = this;
    if(_this.data.strInput != '' || _this.data.feedbackimg.length != 0){
      wx.request({
        url: `${API_HOST}/dynamic/save`,
        method:'POST',
        header: {
          token: wx.getStorageSync('token')
        },
        data:{
          "address": _this.data.localhost,
          "content": _this.data.strInput,
          "imageList": _this.data.feedbackimg
        },
        success:function(res){
          console.log(res.data)
          if(res.data.code == 0){
            wx.navigateBack({
              delta: 1
            })
          }
        },
        fail(err){
          console.log(err)
        }
      })
    }else{
      wx.showToast({
        title: '请表达你想说的',
        icon:'none'
      })
    }

    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length -2];
    // if(_this.data.isDone){
    //   _this.setData({
    //     msg4_input: _this.data.strInput,
    //     msg4_imgs: _this.data.feedbackimg,
    //     ismessageModal:true,
    //     isMsg4Enter:true,
    //     isTells:false,
    //     isVoice:true,
    //     inputValue:'',
    //     isInputEnter: false, // 是否是文字
    //     isVoiceEnter: false, // 是否是音频
    //     isImageEnter: false, // 是否是图片 
    //   },()=>{
    //     _this.isModalshow()
    //     // wx.navigateBack({
    //     //   delta: 1
    //     // })
    //   })
    // }else{ 
    // }
  }, 
  //取消
  oncloes(){
    wx.navigateBack({
      delta:1
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