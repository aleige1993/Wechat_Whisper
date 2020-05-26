'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 过滤对象的函数属性
 * @param {Object} opts
 */
var mergeOptionsToData = function mergeOptionsToData() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = Object.assign({}, opts);

  for (var key in options) {
    if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
      delete options[key];
    }
  }

  return options;
};

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
var bind = function bind(fn, ctx) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.length ? fn.apply(ctx, args) : fn.call(ctx);
  };
};

/**
 * Object assign
 */
var assign = function assign() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Object.assign.apply(Object, [{}].concat(args));
};

exports.default = Behavior({
  definitionFilter: function definitionFilter(defFields) {
    defFields.data = mergeOptionsToData(defFields.data);
    defFields.data.in = false;
    defFields.data.visible = false;
  },

  methods: {
    /**
     * 过滤对象的函数属性
     * @param {Object} opts
     */
    $$mergeOptionsToData: mergeOptionsToData,
    /**
     * 合并参数并绑定方法
     *
     * @param {Object} opts 参数对象
     * @param {Object} fns 方法挂载的属性
     */
    $$mergeOptionsAndBindMethods: function $$mergeOptionsAndBindMethods() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var fns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fns;

      var options = Object.assign({}, opts);

      for (var key in options) {
        if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
          fns[key] = bind(options[key], this);
          delete options[key];
        }
      }

      return options;
    },

    /**
     * Promise setData
     * @param {Array} args 参数对象
     */
    $$setData: function $$setData() {
      var _this = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var params = assign.apply(undefined, [{}].concat(_toConsumableArray(args)));

      return new Promise(function (resolve) {
        _this.setData(params, resolve);
      });
    },

    /**
     * 延迟指定时间执行回调函数
     * @param {Function} callback 回调函数
     * @param {Number} timeout 延迟时间
     */
    $$requestAnimationFrame: function $$requestAnimationFrame() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16.666666666666668;

      return new Promise(function (resolve) {
        return setTimeout(resolve, timeout);
      }).then(callback);
    }
  },
  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  created: function created() {
    this.fns = {};
  },

  /**
   * 组件生命周期函数，在组件实例被从页面节点树移除时执行
   */
  detached: function detached() {
    this.fns = {};
  }
});