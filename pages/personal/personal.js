import { API_HOST, API_CUSTOM_LIST, API_USER_INFO, API_FIND_FRIEND, API_BIND_FRIEND, API_QUERY_MESSAGE_LIST, API_UPLOAD_FILE, API_INSTER_MESSAGE } from '../../utils/config.js'
var jsPinYin = require("../../npm/js-pinyin/index.js");
import { toast } from '../../utils/modal'
import { $wuxCalendar } from '../../components/wux/index'
let date = new Date();
let Year = date.getFullYear();
let Month = date.getMonth();
let Day = date.getDate();
let Hours = date.getHours();
let Minutes = date.getMinutes();
let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let displayTime = `${Year}-${Month + 1}-${Day}`
let timenav = `${Year}年${Month + 1}月${Day}日`
let weeknew = weekDay[date.getDay()]
let timeHours = `${Hours}:${Minutes}:00`
var recorderManager = wx.getRecorderManager();
var innerAudioContext = wx.createInnerAudioContext()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const hh = date.getHours();
const mm = date.getMinutes();
for (let i = date.getFullYear(); i <= date.getFullYear() + 2; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (var i = 0; i <= 23; i++) {
  if (i <= 9) {
    i = '0' + i;
  }
  hours.push(i);
}
for (var i = 0; i <= 59; i++) {
  if (i <= 9) {
    i = '0' + i;
  }
  minutes.push(i);
}
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    isShowHelp: false,
    isShowFuc: false,
    isShowTd: false,
    layers: false,
    weekDay: weeknew,
    isDateShow: false,
    isAnimate: false,
    year: date.getFullYear(),
    month: Month + 1,
    day: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    hh: hh > 10 ? hh : "0" + hh,
    mm: mm > 10 ? mm : "0" + mm,
    timeValue: [hh, mm],
    yearValue: [0, Month , Day - 1],
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    friendID: "",
    isAuth: false,
    userId: '',
    searchValue: '',
    paddingTop: 0,
    systeminfo: {},
    list: [],
    isSearch: false,
    isShowBg: false,
    searchData: [],
    isTopArr: [], // 置顶
    data: [],
    noticeNumberData: {
      messageCount: 0,
      messageNumCount: 0
    },
    indexHeight: 'calc(100vh- 348rpx)',
    callBack_id: '',
    callBack_img: '',
    callBack_name: '',
    paddingTop: 0,
    systeminfo: {},
    tabBarHeight: 0,
    isTells: false,
    isFocus: false,
    bottomStyle: 0,
    isVoice: false,
    textareaHeight: 60,
    isChoose: false,
    isShowModal: false,
    inputValue: '',
    voiceValue: '',
    imageValue: [],
    isInputEnter: false, // 是否是文字
    isVoiceEnter: false, // 是否是音频
    isImageEnter: false, // 是否是图片
    isMsg4Enter: false, // 是否是第四种
    is_clock: false,
    recorderManager: null,
    startPoint: 0,
    voiceMsgVal: '说出悄悄话',
    autoFocus: false,
    isShowTextarea: false,
    messageList: [],
    userId: "",
    duration: 0,
    insertFriendID: 0,
    insertImgUrl: "",
    isPlayVoice: false,
    insertName: "",
    firendName: "",
    isShowVoiceA: false,
    nowImage: "",
    length: 0,
    options: {},
    displayTime: displayTime,
    weekDayNew: weeknew,
    dateNew: timenav,
    timeHours: timeHours,
    isCurDate: false,
    bidisplayTime: '',
    ismessageModal: false,
    msg4_input: "",
    msg4_imgs: []
  },
  updataTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    this.setData({
      hh: hh > 10 ? hh : "0" + hh,
      mm: mm > 10 ? mm : "0" + mm
    })
  },
  onShowMessage() {
    var _this = this;
    this.setData({
      isDateShow: false,
      isAnimate: true
    });
    setTimeout(function () {
      _this.setData({
        isAnimate: false
      });
    }, 200);
  },
  onSelectDateShow() {
    var _this = this;
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    this.setData({
      isDateShow: true,
      isAnimate: false
    });
    setTimeout(function () {
      _this.setData({
        isAnimate: true,
        timeValue: [hh, mm]
      });
    }, 200);
  },
  onChangeYear(e) {
    let _this = this;
    let val = e.detail.value;
    let newDate = new Date(_this.data.years[val[0]] + "/" + _this.data.months[val[1]] + "/" + _this.data.days[val[2]]).getDay();
    _this.setData({
      year: _this.data.years[val[0]],
      month: _this.data.months[val[1]],
      day: _this.data.days[val[2]],
      value: val,
      weekDayNew: weekDay[newDate]
    });
  },
  onChangeTime(e) {
    let _this = this;
    let val = e.detail.value;
    this.setData({
      hh: _this.data.hours[val[0]],
      mm: _this.data.minutes[val[1]],
      timeValue: val
    });
  },
  showMESGfc() {
    this.setData({
      isTells: !this.data.isTells

    })
  },
  onChooseFriend() {
    wx.navigateTo({
      url: "/pages/chooseFriend/index"
    });
  },
  onMessageModal(is) {
    let _this = this;
    this.setData({
      ismessageModal: is
    }, () => {
      if (is) {
        _this.updataTime()
      }
    })
  },
  isModalshow() {
    this.updataTime()
    this.setData({
      ismessageModal: true
    })
  },
  goPortrait(){
    wx.navigateTo({
      url: '/pages/personal/portrait/index',
    })
  },
  isModalhide() {
    this.setData({
      ismessageModal: false,
      isTells:false,
      imgUrl: '',
      friendID: '',
      friendName: '',
      inputValue:''
    })
    innerAudioContext.stop()
    innerAudioContext.destroy();
  },
  //查看图片
  getShowimgs(e) {
    console.log(e)
    let usrIdex = e.currentTarget.dataset.item;
    let list = e.currentTarget.dataset.list;
    wx.previewImage({
      current: usrIdex, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  onShowImage() {
    wx.navigateTo({
      url: '/pages/editMesg/index',
    })
    // this.setData({
    //   isChoose: !this.data.isChoose
    // })
  },
  onImageToolClick(e) {
    let _this = this;
    let flag = e.currentTarget.dataset.flag
    wx.chooseImage({
      sourceType: [flag],
      success: res => {
        let successNum = 0;
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        const urlArr = [];
        for (var index in tempFilePaths) {
          wx.uploadFile({
            url: `${API_HOST}${API_UPLOAD_FILE}`,
            filePath: tempFilePaths[index],
            name: 'file',
            header: {
              token: wx.getStorageSync('token')
            },
            success: uploadRes => {
              successNum++;
              if (JSON.parse(uploadRes.data).code === 0) {
                const url = JSON.parse(uploadRes.data).url
                urlArr.push(`${API_HOST.replace('api', '')}/${url}`)
              }
            },
            complete: () => {
              if (successNum === tempFilePaths.length) {
                _this.setData({
                  isInputEnter: false,
                  isVoiceEnter: false,
                  isImageEnter: true,
                  isMsg4Enter: false,
                  isShowModal: true,
                  imageValue: urlArr
                }, () => {
                  _this.isModalshow()
                })
              }
            }
          })
        };
      }
    })
  },
  timed(timeStr) {
    return timeStr.slice(0, 4) + '年' + timeStr.slice(5, 7) + '月' + timeStr.slice(8, 10) + '日 '
  },
  openCalendar() {
    // console.log(this.data.displayTime)
    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $wuxCalendar().open({
      value: '',
      minDate: this.data.displayTime,
      onChange: (values, displayValues) => {
        let newData = new Date(displayValues[0]).getDay()
        let weekDayNew = weekDay[newData]
        let dateNew = this.timed(displayValues[0])
        // console.log('onChange', values, displayValues)
        this.setData({
          bidisplayTime: displayValues[0],
          weekDayNew: weekDayNew,
          dateNew: dateNew,
          isCurDate: true
        })
      },
    })
  },
  onCurrentDate(e) {
    let val = e.detail
    this.setData({
      timeHours: val,
      isCurDate: false
    })
  },
  onCurrCel() {
    this.setData({
      isCurDate: false
    })
  },
  onSendMessage() {
    var _this = this;
    var messageContent = "";
    var messageType = "";
    if (this.data.friendID == '') {
      wx.showToast({
        title: '请选择好友',
        icon: 'none'
      })
      return false
    }
    if (this.data.isInputEnter) {
      messageContent = this.data.inputValue;
      messageType = 1;
    } else if (this.data.isVoiceEnter) {
      messageContent = this.data.voiceValue;
      messageType = 2;
    } else if (this.data.isImageEnter) {
      messageContent = this.data.imageValue.join(',');
      messageType = 3;
    } else if (this.data.isMsg4Enter) {
      let inputStr = this.data.msg4_input;
      let imgsJoin = this.data.msg4_imgs.join(',');
      messageContent = inputStr + "," + imgsJoin
      messageType = 4;
    }
    let _state = this.data,
      year = _state.year,
      month = _state.month,
      day = _state.day,
      hh = _state.hh,
      mm = _state.mm;

    var nowDate = new Date().getTime();
    var dataStr = year + "/" + (month < 10 ? '0' + month : month) + "/" + (day < 10 ? '0' + day : day) + " " + hh + ":" + mm;
    var selectDate = new Date(dataStr).getTime();
    if (selectDate <= nowDate) {
      wx.showToast({
        title: '请勿选择之前的时间',
        icon: 'none'
      })
      return false;
    }
    wx.request({
      url: `${API_HOST}${API_INSTER_MESSAGE}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.friendID,
        friendName: this.data.friendName,
        imgUrl: this.data.imgUrl,
        sex: this.data.sex,
        messageContent: messageContent,
        messageType: messageType,
        voiceTime: this.data.duration,
        planTime: selectDate
      },
      success: function success(res) {

        if (res.data.code == 0) {
          wx.showToast({
            title: '发送成功',
          })
          _this.onMessageModal(false)
          // _this.queryMessageList()
          _this.setData({
            isTells:false,
            inputValue: '',
            imgUrl: '',
            friendID: '',
            friendName: ''
          })
        } else if (res.data.code == 500 || res.data.code == 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }
      },
      fail: function fail() {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
        this.onMessageModal(false)
      },
      complete: (com) => {
        innerAudioContext.stop()
        innerAudioContext.destroy();
      }
    });
    // this.props.onCancel();
  },
  getSystemInfo() {
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      paddingTop: systemInfo.statusBarHeight,
      systeminfo: systemInfo
    });
  },
  onPlayVoice(e) {
    // console.log(e);
    let item = e.currentTarget.dataset.item
    let self = this
    this.setData({
      isPlayVoice: true,
      inputValue: ""
    }) 
    innerAudioContext.src = item.messagecontent;
    innerAudioContext.play();
    innerAudioContext.onStop(res => {
      // console.log(res)
      this.setData({
        isPlayVoice: false,
      })
    })
  },
  playVoice() {
    let _this = this;
    if (this.data.isPlayVoice == true) {
      innerAudioContext.stop()
      this.setData({
        isPlayVoice: false
      })
      return false
    } 
    this.setData({
      isPlayVoice: true
    });
    innerAudioContext.src = this.data.voiceValue;
    innerAudioContext.play();
    innerAudioContext.onEnded(function () {
      _this.setData({
        isPlayVoice: false
      });
    });

  },
  onImageClick(item) {
    // wx.navigateTo({
    //   url: `/pages/friendInformation/index?id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}`
    // })
  },
  onSwitchModel() {
    this.setData({
      isVoice: !this.data.isVoice,
      inputValue: '',
      isChoose: false
    });
    if (this.data.isVoice) {
      this.setData({
        autoFocus: true,
        isShowTextarea: true
      })
    }
  },
  // input聚焦时触发
  openKeyboard(e) {
    let _this = this
    setTimeout(function () {
      var isFocus = true;
      var bottomStyle = e.target.height + 'px'; //软键盘的高度
      _this.setData({
        bottomStyle: bottomStyle,
        isFocus: isFocus,
        isChoose: false
      });
    }, 1);
  },
  //输入框失去焦点时触发
  outKeyboard() {
    const commentContent = this.data.commentContent
    this.setData({
      isFocus: false,
      bottomStyle: 0,
      isShowTextarea: false,
      autoFocus: false,
      textareaHeight: 60
    })
  },
  onLineChange(e) {
    this.setData({
      textareaHeight: e.detail.height < 60 ? 60 : e.detail.height + 18
    })
  },
  onConfirm() {
    let _this = this;
    if (this.data.inputValue.trim().length !== 0) {
      this.setData({
        isShowModal: true,
        isInputEnter: true,
        isShowTextarea: false,
        isImageEnter: false,
        isMsg4Enter: false,
        autoFocus: false,
        isTells:false,
        isVoice:false
      }, () => {
        _this.onMessageModal(true);
      })
    }
  },

  onCancel(flag) {
    this.setData({
      isShowModal: false,
      isInputEnter: false,
      isVoiceEnter: false,
      isImageEnter: false,
      isMsg4Enter: false,
      inputValue: '',
      voiceValue: '',
      imageValue: [],
    })
    if (flag) {
      // this.queryMessageList();
    }
  },
  onInput(e) {
    this.setData({
      inputValue: e.detail.value.slice(0, 200)
    })
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
  handleRecordStart(e) {
    wx.vibrateLong()
    this.setData({
      startPoint: e.touches[0],
      touchStart: e.timeStamp,
      voiceMsgVal: '松开 结束',
      isShowVoiceA: true,
      is_clock: true
    })

    // this.setData({
    //   is_clock: true,
    //   startPoint: e.touches[0],
    //   voiceMsgVal: '松开 结束',
    //   isShowVoiceA: true
    // });
    var options = {
      format: 'mp3',
      duration:59000
    };
    recorderManager.start(options);
  },
  handleTouchMove(e) {
    // console.log(e)
    // console.log(Math.abs(e.touches[e.touches.length - 1].clientY - this.state.startPoint.clientY) > 25)
    if (Math.abs(e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY) > 25) {
      this.setData({
        is_clock: false,
        voiceMsgVal: '说出悄悄话',
        isShowVoiceA: false
      });
    }
  },
  handleRecordStop(e) {
    // console.log(e)
    let _this = this;
    this.setData({
      touchEnd: e.timeStamp,
      voiceMsgVal: '说出悄悄话',
      isShowVoiceA: false
    })
    // let touchTimes = this.data.touchEnd - this.data.touchStart;
    recorderManager.stop();
    if (this.data.is_clock) {
      recorderManager.onStop(function (res) {
        if (res.duration < 2000) {
          wx.showToast({
            title: '录音时间太短，请长按录音',
            icon: 'none',
            duration: 2000
          });
        } else {
          var tempFilePath = res.tempFilePath;
          // console.log(tempFilePath);
          wx.showLoading({
            title: '语音检索中'
          });
          wx.uploadFile({
            url: `${API_HOST}` + "/uploadFile",
            filePath: tempFilePath,
            name: 'file',
            header: {
              token: wx.getStorageSync('token')
            },
            success: function success(uploadRes) {
              setTimeout(function () {
                wx.hideLoading();
              }, 500);
              var url = JSON.parse(uploadRes.data).url;
              _this.setData({
                voiceValue: API_HOST.replace('api', '') + "/" + url,
                isVoiceEnter: true,
                isMsg4Enter: false,
                isInputEnter: false,
                isImageEnter: false,
                isShowModal: true,
                isTells:false,
                isShowVoiceA: false,
                duration: Math.ceil(res.duration / 1000)
              }, () => {
                _this.isModalshow()
              });
            }
          });
        }
      });
    }
  }, 
  ontextareaViewClick() {
    this.setData({
      isShowTextarea: true,
      autoFocus: true
    });
  },
  onSwitchModel() {
    this.setData({
      isVoice: !this.data.isVoice,
      inputValue: '',
      isChoose: false
    });
    if (this.data.isVoice) {
      this.setData({
        autoFocus: true,
        isShowTextarea: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUser(){ 
      let _this = this;
      wx.request({
        url: `${API_HOST}${API_USER_INFO}`,
        method: "GET",
        header: {
          token: wx.getStorageSync('token')
        },
        success: function success(res) {
          if (res.data.code == 0) {
            let { userId, username, gender, avatarUrl } = res.data.user
            _this.setData({
              userId,
              username, 
              gender,
              avatarUrl
            })
          } else {
           wx.navigateTo({
             url: '/pages/login/index'
           })
          }
        },
        fail: function fail() {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      });
    },
  onToolClick(){
    wx.navigateTo({
      url: '/pages/intimate/index',
    })
  },
  onVersionClick(){
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },
  onOpenVip(){
    wx.navigateTo({
      url: '/pages/personal/openvip/index',
    })
  },
  onDevLop() {
    wx.navigateTo({
      url: '/pages/personal/devlop/index',
    })
  },
  onHelpClick(){
    this.setData({
      isShowHelp: true
    });
  },
  onHideHelp(){
    this.setData({
      isShowHelp: false,
      isShowFuc:true,
      layers: true
    });
  },
  onHideFc(){
    this.setData({
      isShowFuc: false,
      isShowTd: true,
      layers: true
    });
  },
  onHideTd(){
    this.setData({ 
      isShowTd: false,
      layers: false
    });
  },
  bcimgs(){
    wx.saveImageToPhotosAlbum({
      filePath:'/assets/images/common/erwei.jpg',
      success(res) {
        wx.showToast({
          title: '已保存到系统相册',
        })
       }
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
    this.getUser()
    this.updataTime()
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
    innerAudioContext.stop()
    innerAudioContext.destroy();
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