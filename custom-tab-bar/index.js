Component({
  data: {
    hot:3,
    selected: 0,
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
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('url', url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})