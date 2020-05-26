"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isEmpty = require("./isEmpty.js");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _shallowEqual = require("./shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALL_DATA_KEY = '**';

var trim = function trim() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.replace(/\s/g, '');
};

exports.default = Behavior({
  lifetimes: {
    attached: function attached() {
      this.initComputed();
    }
  },
  definitionFilter: function definitionFilter(defFields) {
    var _defFields$computed = defFields.computed,
        computed = _defFields$computed === undefined ? {} : _defFields$computed;

    var observers = Object.keys(computed).reduce(function (acc, name) {
      var _ref = Array.isArray(computed[name]) ? computed[name] : [ALL_DATA_KEY, computed[name]],
          _ref2 = _slicedToArray(_ref, 2),
          field = _ref2[0],
          getter = _ref2[1];

      return _extends({}, acc, _defineProperty({}, field, function () {
        if (typeof getter === 'function') {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var newValue = getter.apply(this, args);
          var oldValue = this.data[name];
          if (!(0, _isEmpty2.default)(newValue) && !(0, _shallowEqual2.default)(newValue, oldValue)) {
            this.setData(_defineProperty({}, name, newValue));
          }
        }
      }));
    }, {});

    Object.assign(defFields.observers = defFields.observers || {}, observers);
    Object.assign(defFields.methods = defFields.methods || {}, {
      initComputed: function initComputed() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var isForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!this.runInitComputed || isForce) {
          this.runInitComputed = false;
          var context = this;
          var result = _extends({}, this.data, data);
          Object.keys(observers).forEach(function (key) {
            var values = trim(key).split(',').reduce(function (acc, name) {
              return [].concat(_toConsumableArray(acc), [result[name]]);
            }, []);
            observers[key].apply(context, values);
          });
          this.runInitComputed = true;
        }
      }
    });
  }
});