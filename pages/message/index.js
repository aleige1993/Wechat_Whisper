import {
  API_HOST,
  API_QUERY_MESSAGE_LIST,
  API_UPLOAD_FILE,
  API_INSTER_MESSAGE,
  API_MODIFY_VOICE
} from '../../utils/config.js'
import {
  toast
} from '../../utils/modal'
import {
  $wuxCalendar
} from '../../components/wux/index'
let  luanarInfo =  require('../../utils/luanarInfo.js')
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
for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
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
    imagesinfos:{},
    luanrText: luanarInfo.GetLunarDay( date.getFullYear() , Month + 1, date.getDate()),
    msgTypes: 1,
    weekDay: weeknew,
    isDateShow: false,
    isAnimate: false,
    year: date.getFullYear(),
    month: Month + 1,
    day: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    hh: hh > 9 ? hh : "0" + hh,
    mm: mm > 10 ? mm : "0" + mm,
    timeValue: [hh, mm],
    yearValue: [0, Month, Day - 1],
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    callBack_id: '',
    callBack_img: '',
    callBack_name: '',
    paddingTop: 0,
    systeminfo: {},
    tabBarHeight: 0,
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
    voiceMsgVal: '按住说话',
    autoFocus: false,
    isShowTextarea: false,
    messageList: [],
    userId: "",
    duration: 0,
    insertFriendID: 0,
    insertImgUrl: "",
    isPlayVoice: false,
    noPlayvoice:false,
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
    msg4_imgs: [],
    messagetype: 4,
    isbf: true
  },
  imageLoad: function(e) {
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=200,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight=200/ratio;    //计算的高度值
     var image=this.data.imagesinfos; 
     //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
     image[e.target.dataset.index]={
        width:viewWidth,
        height:viewHeight
     }
     this.setData({
        imagesinfos:image
     })
 },
  updataTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    this.setData({
      hh: hh > 9 ? hh : "0" + hh,
      mm: mm > 10 ? mm : "0" + mm
    })
  },
  onShowMessage() {
    var _this = this;
    this.setData({
      isDateShow: false,
      isAnimate: true,
      luanrText: luanarInfo.GetLunarDay(this.data.year,this.data.month,this.data.day)
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
  ontextareaViewClick() {
    this.setData({
      isShowTextarea: true,
      autoFocus: true
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
    return year + "年" + month + "月" + date + "日 " + (hour>9?hour:'0'+hour) + ":" + (minute>9?minute:'0'+minute);
  },
  queryMessageList() {
    let _this = this
    wx.request({
      url: `${API_HOST}${API_QUERY_MESSAGE_LIST}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.friendID
        // friendID: 6

      },
      success: res => {
        if (res.data.code == 0) {
          res.data.data.forEach((item, index) => {
            item.plantime = _this.formatDate(item.plantime)
            if (item.messagetype == 3) {
              item.messagecontent = item.messagecontent.split(',')
            }
            if (item.messagetype == 4) {
              let strmesg = item.messagecontent.split(',')
              item.messagestr = strmesg[0]
              item.messagecontent = strmesg.slice(1)

            }
          })
          this.setData({
            messageList: res.data.data,
          })
          setTimeout(() => {
            this.setData({
              length: res.data.data.length - 1
            })
          }, 200)
        } else if (res.data.code === 50001) {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        } else {
          toast(res.data.msg)

        }
      },
      fail: () => {
        toast("或取消息失败")
      }
    })
  },
  getSystemInfo() {
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      paddingTop: systemInfo.statusBarHeight,
      systeminfo: systemInfo
    });
  },
  modifyStutas(id) {
    let _this = this
    wx.request({
      url: `${API_HOST}${API_MODIFY_VOICE}?messageId=${id}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      // data: {
      //   messageId: id
      // },
      success: res => {

      }
    })
  },
  onPlayVoice(e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    let index = e.currentTarget.dataset.index
    let list = this.data.messageList
    let self = this
    let key = 'messageList[' + index + '].messagestatus'
    let ishooks = 'messageList[' + index + '].ishooks'
    if (this.data.noPlayvoice == true) {
      console.log(ishooks)
      innerAudioContext.stop()
      this.setData({
        noPlayvoice: false,
        [ishooks]:false
      })
    }else{
      this.setData({
        noPlayvoice: true,
        [ishooks]:true,
        // inputValue: "",
        [key]: 3
      })
      this.modifyStutas(item.id);
      innerAudioContext.src = item.messagecontent;
      innerAudioContext.autoplay = true;
      innerAudioContext.play();
      innerAudioContext.onEnded(res => {
        self.setData({
          isPlayVoice: false,
          [ishooks]:false
        })
      })
    } 
    innerAudioContext.onError((err)=>{
      console.log(err)
    })
    innerAudioContext.onStop(() => {
      console.log(1111111)
      innerAudioContext.stop()
      self.setData({
        [ishooks]:false,
        noPlayvoice:false
      })
      console.log("停止")
    })
  },
  playVoice() {
    let _this = this;
    if (this.data.noPlayvoice == true) {
      innerAudioContext.stop()
      _this.setData({
        noPlayvoice: false,
        isPlayVoice:false
      })
      return false
    }
    _this.setData({
      noPlayvoice: true,
      isPlayVoice: true
    });
    innerAudioContext.src = _this.data.voiceValue;
    innerAudioContext.autoplay = true;
      innerAudioContext.play();
    innerAudioContext.onEnded(function () {
      _this.setData({
        noPlayvoice: false,
        isPlayVoice:false
      });
    });
    innerAudioContext.onError((err)=>{
      _this.setData({
        noPlayvoice: false,
        isPlayVoice:false
      });
    })
    innerAudioContext.onStop(() => {
      _this.setData({ 
        noPlayvoice:false,
        isPlayVoice:false
      })
      console.log("停止")
    })
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
    // onItemClickToFriendInfo(e) {
  //   let item = e.currentTarget.dataset.item;
  //   wx.navigateTo({
  //     url: `/pages/friendInformation/index?userid=${item.userid}&id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&remarkname=${item.remarkname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}&itemlist=${JSON.stringify(item)}`
  //   })
  // },
  onItemClickToFriendInfo(e) {
    let item = this.data.itemlist;
    wx.navigateTo({
      url: `/pages/friendInformation/index?userAdmin=2&userid=${item.userid}&id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&remarkname=${item.remarkname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}&itemlist=${JSON.stringify(this.data.itemlist)}`
    })
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
    _this.onScrollTo();
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
        isVoice: true
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
      this.queryMessageList();
    }
  },
  onInput(e) {
    this.setData({
      inputValue: e.detail.value.slice(0, 200)
    })
  },
  ontextareaViewClick() {
    this.setData({
      isShowTextarea: true,
      autoFocus: true,
    })
  },
  onShowImage() {
    wx.navigateTo({
      url: '/pages/editMesg/index?options='+ JSON.stringify(this.data.options),
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
                // const url = JSON.parse(uploadRes.data).url
                urlArr.push(`${url}`)
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
    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $wuxCalendar().open({
      value: '',
      minDate: this.data.displayTime,
      onChange: (values, displayValues) => {
        let newData = new Date(displayValues[0]).getDay()
        let weekDayNew = weekDay[newData]
        let dateNew = this.timed(displayValues[0])
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
          _this.queryMessageList()
          _this.setData({
            inputValue: '',
            msgTypes: 1
          })
          let NavigationBarTitle = _this.data.friendName
          if (_this.data.remarkname && _this.data.remarkname != 'null') {
            NavigationBarTitle = _this.data.remarkname
          }
          wx.setNavigationBarTitle({
            title: NavigationBarTitle
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
  isModalhide() {
    this.setData({
      ismessageModal: false,
      inputValue: '',
      isInputEnter: false,
      isVoiceEnter: false,
      isImageEnter: false,
      isMsg4Enter: false
    })
    innerAudioContext.stop()
    innerAudioContext.destroy();
  },
  handleRecordStart(e) {
    wx.vibrateLong()
    this.setData({
      startPoint: e.touches[0],
      touchStart: e.timeStamp,
      voiceMsgVal: '松开结束',
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
      duration: 59000
    };
    recorderManager.start(options);
  },
  handleTouchMove(e) {

    // console.log(Math.abs(e.touches[e.touches.length - 1].clientY - this.state.startPoint.clientY) > 25)
    if (Math.abs(e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY) > 25) {
      this.setData({
        is_clock: false,
        voiceMsgVal: '按住说话',
        isShowVoiceA: false
      });
    }
  },
  handleRecordStop(e) {

    let _this = this;
    this.setData({
      touchEnd: e.timeStamp,
      voiceMsgVal: '按住说话',
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
              console.log('uploadRes',url)
              _this.setData({
                voiceValue: url,
                isVoiceEnter: true,
                isMsg4Enter: false,
                isInputEnter: false,
                isImageEnter: false,
                isShowModal: true,
                isShowVoiceA: false,
                duration: Math.ceil(res.duration / 1000),
                msgTypes:3
              }, () => {
                //我 _this.isModalshow()
              });
            }
          });
        }
      });
    }
  },
  onChooseFriend() {
    wx.navigateTo({
      url: "/pages/chooseFriend/index"
    });
  },
  //查看图片
  getShowimgs(e) {

    let usrIdex = e.currentTarget.dataset.item;
    let list = e.currentTarget.dataset.list;
    wx.previewImage({
      current: usrIdex, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let NavigationBarTitle = options.friendName
    if (options.remarkname && options.remarkname != 'null' && options.remarkname != 'undefined') {
      NavigationBarTitle = options.remarkname
    }
    wx.setNavigationBarTitle({
      title: NavigationBarTitle
    })
    this.setData({
      options,
      friendID: options.friendID,
      friendName: options.friendName,
      remarkname: options.remarkname,
      imgUrl: options.imgUrl,
      sex: options.sex,
      userId: wx.getStorageSync('userId'),
      itemlist: JSON.parse(options.itemlist)
    })

    this.queryMessageList()

  },
  onScrollTo() {
    let _this = this;
    wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
      if (rect) {
        wx.pageScrollTo({
          scrollTop: rect.height,
          duration: 300
        })
      }
    }).exec()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this;
    setTimeout(() => {
      wx.createSelectorQuery().select('#page').boundingClientRect(function (rect) {
        if (rect) {

          wx.pageScrollTo({
            scrollTop: rect.height,
            duration: 300
          })
        }
      }).exec()
    }, 300)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updataTime()
    this.queryMessageList();
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
    return {
      title: "有什么想说的 可以悄悄说了",
      path: "/pages/whisper/whisperHome/index?userId=" + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/logo7.png",
    };
  },
  changtypesas(e){
    console.log(e)
    let val = e.currentTarget.dataset.changes
    this.setData({
      msgTypes: val
    })
  }
})