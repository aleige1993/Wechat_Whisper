function getPromiseApi(wxApi,object){
  return  new Promise((resolve,reject)=>{
    wxApi({
      ...object,
      success: resolve,
      fail: reject
    })
  })
}

var WX = {}

for (let key in wx) {
  WX[key] = object => getPromiseApi(wx[key], object)
  wx[`$${key}`]= WX[key]
}

export default WX