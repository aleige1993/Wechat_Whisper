/**
 * Alert 只有确定按钮
 * @param content 消息内容
 * @param callback 确定按钮回调
 * @param options 其他配置项参数，详见 wx.showModal API
 * https://developers.weixin.qq.com/miniprogram/dev/api/wx.showModal.html
 */
function alert(content, callback, options) {
    let modalOptions = {
        title: options && options.title || '提示',
        content: content || '',
        showCancel: false,
        confirmText: options && options.confirmText || '确定',
        success(res) {
            if (res.confirm) {
                callback && callback();
            }
        }
    };

    if (options && typeof options === 'object') {
        for (let key in options) {
            modalOptions[key] = options[key];
        }
    }

    wx.showModal(modalOptions);
}

/**
 * Confirm 有确定和取消按钮
 * @param content 消息内容
 * @param callback 按钮回调, ok=true 表示确定，ok=false 表示取消
 * @param options 其他配置项参数，详见 wx.showModal API
 * https://developers.weixin.qq.com/miniprogram/dev/api/wx.showModal.html
 */
function confirm(content, callback, options) {
    let modalOptions = {
        title: '确认',
        content: content,
        showCancel: true,
        confirmText: '确定',
        cancelText: '取消',
        cancelColor: '#999999',
        success(res) {
            callback && callback(res.confirm);
        }
    };

    if (options && typeof options === 'object') {
        for (let key in options) {
            modalOptions[key] = options[key];
        }
    }

    wx.showModal(modalOptions);
}

/**
 * Toast 消息提示框
 * @param title 消息内容
 * @param options 其他配置项参数，详见 wx.showToast API
 * https://developers.weixin.qq.com/miniprogram/dev/api/wx.showToast.html
 */
function toast(title, options) {
    let toastOptions = {
        title: title,
        icon: 'none',
        duration: 3000
    };

    if (options && typeof options === 'object') {
        // for (let key in options) {
        //     toastOptions[key] = options[key];
        // }
        Object.assign(toastOptions,options)
    }

    wx.showToast(toastOptions);
}

module.exports = {
    alert,
    confirm,
    toast
};
