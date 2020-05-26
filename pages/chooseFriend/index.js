
import { API_HOST, API_FIND_FRIEND,API_BIND_FRIEND} from '../../utils/config.js'
var jsPinYin = require("../../npm/js-pinyin/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth:false,
    userId:'',
    searchValue: '',
    paddingTop: 0,
    systeminfo: {},
    list: [],
    indexList:[],
    isSearch: false,
    isShowBg: false,
    searchData: [],
    isTopArr: [], // 置顶
    data: [],
    noticeNumberData: {
      messageCount: 0,
      messageNumCount: 0
    },
    indexHeight:'calc(100vh- 348rpx)'
  },
  // data: {

  //   "searchValue": "",
  //   "systeminfo": {
  //     "errMsg": "getSystemInfo:ok",
  //     "model": "iPhone 6/7/8",
  //     "pixelRatio": 2,
  //     "windowWidth": 375,
  //     "windowHeight": 603,
  //     "system": "iOS 10.0.1",
  //     "language": "zh",
  //     "version": "7.0.4",
  //     "screenWidth": 375,
  //     "screenHeight": 667,
  //     "SDKVersion": "2.9.4",
  //     "brand": "devtools",
  //     "fontSizeSetting": 16,
  //     "benchmarkLevel": 1,
  //     "batteryLevel": 80,
  //     "statusBarHeight": 20,
  //     "safeArea": {
  //       "right": 375,
  //       "bottom": 667,
  //       "left": 0,
  //       "top": 20,
  //       "width": 375,
  //       "height": 647
  //     },
  //     "platform": "devtools"
  //   },
  //   "list": [
  //     {
  //       "title": "W",
  //       "key": "W",
  //       "items": [
  //         {
  //           "id": 351,
  //           "userid": 14,
  //           "username": "aleige",
  //           "friendid": 7,
  //           "friendname": "王。",
  //           "sex": 1,
  //           "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDCWHRAKvs83YbLibBgVCHMhFfXiahmro1TEQvvtSrEsnWE8NNOrLzd11ZBLp64CgpjYzHCibDt9oOg/132",
  //           "intimateid": 30,
  //           "cohesion": 0,
  //           "istop": 0,
  //           "isreject": 0,
  //           "isdelete": 0,
  //           "deletetime": 0,
  //           "createtime": 20200101140642,
  //           "intimate": "同事"
  //         }
  //       ]
  //     }
  //   ],
  //   "isSearch": false,
  //   "isShowBg": false,
  //   "searchData": [],
  //   "data": [
  //     {
  //       "id": 351,
  //       "userid": 14,
  //       "username": "aleige",
  //       "friendid": 7,
  //       "friendname": "王。",
  //       "sex": 1,
  //       "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDCWHRAKvs83YbLibBgVCHMhFfXiahmro1TEQvvtSrEsnWE8NNOrLzd11ZBLp64CgpjYzHCibDt9oOg/132",
  //       "intimateid": 30,
  //       "cohesion": 0,
  //       "istop": 0,
  //       "isreject": 0,
  //       "isdelete": 0,
  //       "deletetime": 0,
  //       "createtime": 20200101140642,
  //       "intimate": "同事"
  //     }
  //   ],
  //   "isTopArr": [],
  //   "$compid__3": "138",
  //   "__preload_": null,
  //   "compid": null,
  //   "extraProps": null,
  //   "$taroCompReady": true,
  //   "__webviewId__": 76
  // },
  getFriendList() {
    wx.request({
      url: `${API_HOST}${API_FIND_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        if(res.data.code == 50001) {
          wx.setStorageSync('token','')
          this.setData({isAuth:false})
        }
        if(res.data.code === 0) {
          let data = res.data.data;
            const isTopArr = data.filter(v => v.istop);
            const listData = this.data_letter_sort(data.filter(v => !v.istop))
            let list = [];
          let indexList = [];
            Object.keys(listData).forEach(v => {
              list.push({
                title: v,
                key: v,
                items: listData[v]
              })
              indexList.push(v)
            })
            list = list.filter(v => v.items.length > 0)
            this.setData({
              isTopArr: isTopArr,
              list: list,
              data,
              indexList
            })
        }
      },
    })
  },
  data_letter_sort(data) {
    var letter_reg = /^[A-Z]$/;
    var list = new Array();
    for (var i = 0; i < data.length; i++) {
      // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
      list['#'] = new Array();
      // 首字母 转 大写英文
      let field = data[i].remarkname == null ? data[i].friendname : data[i].remarkname
      var letter = jsPinYin.getCamelChars(field).substr(0, 1).toUpperCase();
      // 是否 大写 英文 字母
      if (!letter_reg.test(letter)) {
        letter = '#';
      }
      // 创建 字母 分组
      if (!(letter in list)) {
        list[letter] = new Array();
      }
      // 字母 分组 添加 数据
      list[letter].push(data[i]);
    }
    // 转换 格式 进行 排序；
    var resault = new Array();
    for (var key in list) {
      resault.push({
        letter: key,
        list: list[key]
      });
    }
    resault.sort(function (x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    // # 号分组 放最后
    var last_arr = resault[0];
    resault.splice(0, 1);
    last_arr && resault.push(last_arr);

    // 转换 数据 格式
    var json_sort = {};
    for (var i = 0; i < resault.length; i++) {
      json_sort[resault[i].letter] = resault[i].list;
    }

    return json_sort;
  },

  getSystemInfo(){
    var systemInfo = wx.getSystemInfoSync();
    // px转换到rpx的比例
    var pxToRpxScale = 750 / systemInfo.windowWidth;
    // 状态栏的高度
    var ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale;
    // 导航栏的高度
    var navigationHeight = 44 * pxToRpxScale;
    // window的宽度
    // let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
    // window的高度
    var ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale;
    // 屏幕的高度
    var ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale;
    // 底部tabBar的高度
    var tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight;
    this.setData({ 
      paddingTop: systemInfo.statusBarHeight,
      systeminfo: systemInfo,
      tabBarHeight: tabBarHeight
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
      remarkname: item.remarkname
    });
    console.log(item);
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.getSystemInfo()

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
    this.getFriendList()
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