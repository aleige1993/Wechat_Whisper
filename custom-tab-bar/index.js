import { API_HOST, API_BIND_FRIEND, API_QUERY_NOTICE, API_QUERY_USER_MESSAGE } from '../utils/config.js'
Component({
  data: {
    hot:3,
    selected: 0,
    ceshi:0,
    color: "#000000",
    selectedColor: "#07C160",
    list: [{
      "pagePath": "/pages/tellsPeople/index",
      "iconPath": "/assets/images/tabs/collect_a.png",
      "selectedIconPath": "/assets/images/tabs/collect_b.png",
      "text": "收话人"
    },
    {
      "pagePath": "/pages/whisper/whisperHome/index",
      "iconPath": "/assets/images/tabs/whisper_a.png",
      "selectedIconPath": "/assets/images/tabs/whisper_b.png",
      "text": "悄悄话"
    },
    {
      "pagePath": "/pages/personal/personal",
      "iconPath": "/assets/images/tabs/center_a.png",
      "selectedIconPath": "/assets/images/tabs/center_b.png",
      "text": "我"
    }],
    ToalNumberData:''
  },
  attached() {
    // this.getNoticeToal()
  },
  // pageLifetimes(){
  //   show:this.getNoticeToal()
  // },
  methods: {
    getNoticeToal(){
      let _this = this;
      wx.request({
        url: API_HOST + "/dynamic/queryNoticeTotal",
        method: "GET",
        header: {
          token:wx.getStorageSync('token')
        },
        success: function success(res) {
          console.log('ToalNumberData', res)
          if (res.data.code == 0) {
            _this.setData({
              ToalNumberData: res.data.data
            });
          }
        }
      })
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      let _this = this
      console.log('url', url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      },()=>{
      })
    }
  }
})