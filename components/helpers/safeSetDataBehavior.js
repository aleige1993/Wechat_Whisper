"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Behavior({
  lifetimes: {
    created: function created() {
      this.nextCallback = null;
    },
    detached: function detached() {
      this.cancelNextCallback();
    }
  },
  methods: {
    /**
     * safeSetData
     * @param {Object} nextData 数据对象
     * @param {Function} callback 回调函数
     */
    safeSetData: function safeSetData(nextData, callback) {
      var _this = this;

      this.pendingData = Object.assign({}, this.data, nextData);
      callback = this.setNextCallback(callback);

      this.setData(nextData, function () {
        _this.pendingData = null;
        callback();
      });
    },

    /**
     * 设置下一回调函数
     * @param {Function} callback 回调函数
     */
    setNextCallback: function setNextCallback(callback) {
      var _this2 = this;

      var active = true;

      this.nextCallback = function (event) {
        if (active) {
          active = false;
          _this2.nextCallback = null;

          callback.call(_this2, event);
        }
      };

      this.nextCallback.cancel = function () {
        active = false;
      };

      return this.nextCallback;
    },

    /**
     * 取消下一回调函数
     */
    cancelNextCallback: function cancelNextCallback() {
      if (this.nextCallback !== null) {
        this.nextCallback.cancel();
        this.nextCallback = null;
      }
    }
  }
});