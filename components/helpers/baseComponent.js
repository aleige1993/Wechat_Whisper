"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _computedBehavior = require("./computedBehavior.js");

var _computedBehavior2 = _interopRequireDefault(_computedBehavior);

var _relationsBehavior = require("./relationsBehavior.js");

var _relationsBehavior2 = _interopRequireDefault(_relationsBehavior);

var _safeAreaBehavior = require("./safeAreaBehavior.js");

var _safeAreaBehavior2 = _interopRequireDefault(_safeAreaBehavior);

var _safeSetDataBehavior = require("./safeSetDataBehavior.js");

var _safeSetDataBehavior2 = _interopRequireDefault(_safeSetDataBehavior);

var _funcBehavior = require("./funcBehavior.js");

var _funcBehavior2 = _interopRequireDefault(_funcBehavior);

var _compareVersion = require("./compareVersion.js");

var _compareVersion2 = _interopRequireDefault(_compareVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    SDKVersion = _wx$getSystemInfoSync.SDKVersion;

var libVersion = '2.6.6';

// check SDKVersion
if (platform === 'devtools' && (0, _compareVersion2.default)(SDKVersion, libVersion) < 0) {
  if (wx && wx.showModal) {
    wx.showModal({
      title: '提示',
      content: "\u5F53\u524D\u57FA\u7840\u5E93\u7248\u672C\uFF08" + SDKVersion + "\uFF09\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u4F7F\u7528 Wux Weapp \u7EC4\u4EF6\u5E93\uFF0C\u8BF7\u66F4\u65B0\u57FA\u7840\u5E93\u7248\u672C >=" + libVersion + " \u540E\u91CD\u8BD5\u3002"
    });
  }
}

var baseComponent = function baseComponent() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // add default externalClasses
  options.externalClasses = ['wux-class', 'wux-hover-class'].concat(_toConsumableArray(options.externalClasses = options.externalClasses || []));

  // add default behaviors
  options.behaviors = [_relationsBehavior2.default, _safeSetDataBehavior2.default].concat(_toConsumableArray(options.behaviors = options.behaviors || []), [_computedBehavior2.default]);

  // use safeArea
  if (options.useSafeArea) {
    options.behaviors = [].concat(_toConsumableArray(options.behaviors), [_safeAreaBehavior2.default]);
    delete options.useSafeArea;
  }

  // use func
  if (options.useFunc) {
    options.behaviors = [].concat(_toConsumableArray(options.behaviors), [_funcBehavior2.default]);
    delete options.useFunc;
  }

  // use field
  if (options.useField) {
    options.behaviors = [].concat(_toConsumableArray(options.behaviors), ['wx://form-field']);
    delete options.useField;
  }

  // use export
  if (options.useExport) {
    options.behaviors = [].concat(_toConsumableArray(options.behaviors), ['wx://component-export']);
    options.methods = _extends({
      export: function _export() {
        return this;
      }
    }, options.methods);
    delete options.useExport;
  }

  // add default options
  options.options = _extends({
    multipleSlots: true,
    addGlobalClass: true
  }, options.options);

  return Component(options);
};

exports.default = baseComponent;