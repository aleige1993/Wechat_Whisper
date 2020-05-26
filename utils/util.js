const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 函数节流
function throttle(fn, wait) {
  var oldTime = 0; // fn上次调用时间
  var waitTime = wait || 600 ; // 节流周期
  return function() {
    var context = this;
    var nowTime = new Date(); 
    if (nowTime - oldTime > waitTime) { // 当前时间 - 上次调用时间 > 节流周期
      fn.call(context,...arguments);
      oldTime = nowTime; // 保存事件触发时间
    }
  };
}

module.exports = {
  formatTime: formatTime,
  _throttle:throttle,
}
