


var _classNames = require("../helpers/classNames.js");

var _classNames2 = _interopRequireDefault(_classNames);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-index-item'
    },
    name: {
      type: String,
      value: ''
    }
  },
  computed: {
    classes: ['prefixCls', function (prefixCls) {
      var wrap = 'wux-index-item';
      var hd = prefixCls + "__hd";
      var bd = prefixCls + "__bd";
      return {
        wrap: wrap,
        hd: hd,
        bd: bd
      };
    }]
  },
  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    top: 0,
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updated: function updated(index) {
      var _this = this;

      var className = "." + this.data.prefixCls;
      wx.createSelectorQuery().in(this).select(className).boundingClientRect(function (rect) {
        if (!rect) return;

        _this.setData({
          top: rect.top,
          height: rect.height,
          index: index
        });
      }).exec();
    }
  }
})
