
var _checkIPhoneX = require("../helpers/checkIPhoneX.js");
var _styleToCssString2 = require("../helpers/styleToCssString.js");

Component({
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-index'
    },
    height: {
      type: [String, Number],
      value: 300,
      observer: 'updateStyle'
    },
    showIndicator: {
      type: Boolean,
      value: true
    }
  },
  data: {
    scrollTop: 0,
    sections: [],
    moving: false,
    current: 0,
    currentName: '',
    extStyle: ''
  },
  computed: {
    classes: ['prefixCls', function (prefixCls) {
      var wrap = (0, _classNames2.default)(prefixCls);
      var nav = prefixCls + "__nav";
      var navItem = prefixCls + "__nav-item";
      var indicator = prefixCls + "__indicator";

      return {
        wrap: wrap,
        nav: nav,
        navItem: navItem,
        indicator: indicator
      };
    }]
  },
  methods: {
    /**
     * 更新样式
     */
    updateStyle: function updateStyle() {
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.height;

      var extStyle = (0, _styleToCssString2.default)({ height: height });

      if (extStyle !== this.data.extStyle) {
        this.setData({
          extStyle: extStyle
        });
      }
    },

    /**
     * 更新元素
     */
    updated: function updated() {
      var elements = this.getRelationNodes('../index-item/index');

      if (elements.length > 0) {
        elements.forEach(function (element, index) {
          element.updated(index);
        });

        // HACK: https://github.com/wux-weapp/wux-weapp/issues/224
        setTimeout(this.getNavPoints.bind(this));
      }

      if (this.data.sections.length !== elements.length) {
        this.setData({
          sections: elements.map(function (element) {
            return element.data;
          })
        });
      }
    },

    /**
     * 设置当前激活的元素
     */
    setActive: function setActive(current, currentName) {
      if (current !== this.data.current || currentName !== this.data.currentName) {
        var target = this.data.sections.filter(function (section) {
          return section.index === current && section.name === currentName;
        })[0];
        if (target) {
          this.setData({
            current: current,
            currentName: currentName,
            scrollTop: target.top
          });
        }

        // 振动反馈
        this.vibrateShort();
      }

      this.triggerEvent('change', { index: current, name: currentName });
    },

    /**
     * 手指触摸动作开始
     */
    onTouchStart: function onTouchStart(e) {
      if (this.data.moving) return;
      var _e$target$dataset = e.target.dataset,
          index = _e$target$dataset.index,
          name = _e$target$dataset.name;

      this.setActive(index, name);
      this.setData({ moving: true });
    },

    /**
     * 手指触摸后移动
     */
    onTouchMove: function onTouchMove(e) {
      var target = this.getTargetFromPoint(e.changedTouches[0].pageY);

      if (target !== undefined) {
        var _target$dataset = target.dataset,
            index = _target$dataset.index,
            name = _target$dataset.name;

        this.setActive(index, name);
      }
    },

    /**
     * 手指触摸动作结束
     */
    onTouchEnd: function onTouchEnd(e) {
      var _this = this;

      if (!this.data.moving) return;
      setTimeout(function () {
        return _this.setData({ moving: false });
      }, 300);
    },

    /**
     * 滚动事件的回调函数
     */
    onScroll: function onScroll(e) {
      var _this2 = this;

      if (this.data.moving) return;
      var scrollTop = e.detail.scrollTop;

      this.data.sections.forEach(function (section, index) {
        if (scrollTop < section.top + section.height && scrollTop >= section.top) {
          if (index !== _this2.data.current || section.name !== _this2.data.currentName) {
            _this2.setData({
              current: index,
              currentName: section.name
            });
          }
        }
      });
    },

    /**
     * 获取右侧导航对应的坐标
     */
    getNavPoints: function getNavPoints() {
      var _this3 = this;

      var className = "." + this.data.prefixCls + "__nav-item";
      wx.createSelectorQuery().in(this).selectAll(className).boundingClientRect(function (rects) {
        if (rects.filter(function (n) {
          return !n;
        }).length) return;
        _this3.setData({
          points: rects.map(function (n) {
            return _extends({}, n, { offsets: [n.top, n.top + n.height] });
          })
        });
      }).exec();
    },

    /**
     * 根据坐标获得对应的元素
     */
    getTargetFromPoint: function getTargetFromPoint(y) {
      var points = this.data.points;

      var target = void 0;

      for (var i = points.length - 1; i >= 0; i--) {
        var _points$i$offsets = _slicedToArray(points[i].offsets, 2),
            a = _points$i$offsets[0],
            b = _points$i$offsets[1];

        // 1.判断是否为第一个元素且大于最大坐标点
        // 2.判断是否为最后一个元素且小于最小坐标点
        // 3.判断是否包含于某个坐标系内


        if (i === points.length - 1 && y > b || i === 0 && y < a || y >= a && y <= b) {
          target = points[i];
          break;
        }
      }

      return target;
    }
  },
  created: function created() {
    var systemInfo = (0, _checkIPhoneX.getSystemInfo)();
    this.vibrateShort = function () {
      if (systemInfo.platform !== 'devtools') {
        wx.vibrateShort();
      }
    };
  },
  ready: function ready() {
    this.updateStyle();
    this.getNavPoints();
  }
})
