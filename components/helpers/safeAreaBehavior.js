'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _checkIPhoneX = require('./checkIPhoneX.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultSafeArea = {
  top: false,
  bottom: false
};

var setSafeArea = function setSafeArea(params) {
  if (typeof params === 'boolean') {
    return Object.assign({}, defaultSafeArea, {
      top: params,
      bottom: params
    });
  } else if (params !== null && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    return Object.assign({}, defaultSafeArea);
  } else if (typeof params === 'string') {
    return Object.assign({}, defaultSafeArea, _defineProperty({}, params, true));
  }
  return defaultSafeArea;
};

exports.default = Behavior({
  properties: {
    safeArea: {
      type: [Boolean, String, Object],
      value: false
    }
  },
  observers: {
    safeArea: function safeArea(newVal) {
      this.setData({ safeAreaConfig: setSafeArea(newVal) });
    }
  },
  definitionFilter: function definitionFilter(defFields) {
    var _ref = (0, _checkIPhoneX.getSystemInfo)() || {},
        statusBarHeight = _ref.statusBarHeight;

    var isIPhoneX = (0, _checkIPhoneX.checkIPhoneX)();

    Object.assign(defFields.data = defFields.data || {}, {
      safeAreaConfig: defaultSafeArea,
      statusBarHeight: statusBarHeight,
      isIPhoneX: isIPhoneX
    });
  }
});