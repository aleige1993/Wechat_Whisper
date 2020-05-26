import { API_HOST, API_FEEDBACK_ADDFEED, API_UPLOAD_FILE } from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackcontent: '',
    feedbackimg: [],
    contact: '',
    fileList:[],
    imgNum:0
  },
  onContactChange(e){
    this.setData({
      contact: e.detail.value
    });
  },
  onTextAreaChange(e){
    this.setData({
      feedbackcontent: e.detail.value
    });
  },
    // 上传图片
  afterRead(event) {
    let _this = this
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(file)
    wx.uploadFile({
      url: `${API_HOST}${API_UPLOAD_FILE}`, // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
         let data = JSON.parse(res.data)
        const { feedbackimg = [], fileList = [] } = _this.data;
        feedbackimg.push({ ...file, url: `${API_HOST.replace('api', '')}${data.url}` });
        _this.setData({ 
          feedbackimg,
          imgNum: feedbackimg.length
        });
      }
    });
  },
  //删除图片
  delImgs(e){
    this.data.feedbackimg.splice(e.detail.index,1)
    this.setData({
      feedbackimg: this.data.feedbackimg,
      imgNum: this.data.feedbackimg.length
    })
  },
  //提交资料
  addFeed(){
    let _this = this
    let fileList = []
    if (_this.data.feedbackcontent == ''){
      wx.showToast({
        title: '请填写反馈信息',
        icon:'none'
      })
      return false
    }
    if (_this.data.feedbackimg.length<=0) {
      wx.showToast({
        title: '请上传截图',
        icon: 'none'
      })
      return false
    }
    if (_this.data.contact == '') {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none'
      })
      return false
    }
    _this.data.feedbackimg.map((item)=>{
      fileList += item.url + ','
    })
   wx.request({
     url: `${API_HOST}${API_FEEDBACK_ADDFEED}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        feedbackcontent: _this.data.feedbackcontent,
        feedbackimg: fileList,
        contact: _this.data.contact,
        isallow: 1
      },
      success: function success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '成功',
            icon: 'none'
          });
        } else if (res.data.code == 50001){
          wx.navigateTo({
            url: '/pages/login/index',
          })
        } else{
          wx.showToast({
            title: '失败',
            icon: 'none'
          });
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