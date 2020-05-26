Component({
  options: {
      addGlobalClass: true
  },
  properties: {
      extClass: {
          type: String,
          value: ''
      },
      list: {
          type: Array,
          value: [{
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
      current: {
          type: Number,
          value: 0
      }
  },
  methods: {
      tabChange(e) {
          const { index } = e.currentTarget.dataset
          if (index === this.data.current) {
              return
          }
          this.setData({
              current: index
          })
          this.triggerEvent('change', { index, item: this.data.list[index] })
      }
  }
})
