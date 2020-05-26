
require("./utils/runtime"); // 兼容 async await
require("./utils/wxPromiseApi"); // wx api 处理
//wxf49fdf3bf810d3c9
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null,
    tabbarIndex:1
  }
})