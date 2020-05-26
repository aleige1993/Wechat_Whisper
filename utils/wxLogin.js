import {API_LOGIN, API_HOST, API_VERSION} from "./config";
let isLogining=false;
let retrySuccess=false;
let eventList=[]
async function wxLogin(){
  return new Promise((resolve,reject)=>{
    if (retrySuccess) {
      resolve()
      return;
    } else {
      eventList.push(resolve);
      if (isLogining) {
        return
      } else {
        isLogining = true;
      }
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          getToken(res.code, resolve, reject)
        }else{
          reject()
        }
      },
      fail:function(){
        reject()
      }
    })
  })
}

function getToken(code,resolve,reject){

  wx.request({
    url: `${API_HOST}${GETTOKEN}`,
    data:{
      code:code
    } ,
    method: 'POST',
    success: function(resp) {
      let statusCode = resp.statusCode;
      if (statusCode >= 200 && statusCode < 300 || statusCode == 304){
        wx.setStorageSync("token", resp.data.data.token)
        isLogining=false
        retrySuccess=true
        eventList.forEach(item=>{
          item()
        })
        eventList=[]
      }else{
        reject()
      }
    },
    fail: function(res) {
      reject()
    },
  })
}

module.exports={
  wxLogin
}
