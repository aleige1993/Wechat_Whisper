"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require("./isEmpty.js");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _debounce2 = require("./debounce.js");

var _debounce3 = _interopRequireDefault(_debounce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * bind func to obj
 */
function bindFunc(obj, method, observer) {
  var oldFn = obj[method];
  obj[method] = function (target) {
    if (observer) {
      observer.call(this, target, _defineProperty({}, method, true));
    }
    if (oldFn) {
      oldFn.call(this, target);
    }
  };
}

// default methods
var methods = ['linked', 'linkChanged', 'unlinked'];

// extra props
var extProps = ['observer'];

exports.default = Behavior({
  lifetimes: {
    created: function created() {
      this._debounce = null;
    },
    detached: function detached() {
      if (this._debounce && this._debounce.cancel) {
        this._debounce.cancel();
      }
    }
  },
  definitionFilter: function definitionFilter(defFields) {
    var relations = defFields.relations;


    if (!(0, _isEmpty2.default)(relations)) {
      var _loop = function _loop(key) {
        var relation = relations[key];

        // bind func
        methods.forEach(function (method) {
          return bindFunc(relation, method, relation.observer);
        });

        // delete extProps
        extProps.forEach(function (prop) {
          return delete relation[prop];
        });
      };

      for (var key in relations) {
        _loop(key);
      }
    }

    Object.assign(defFields.methods = defFields.methods || {}, {
      getRelationsName: function getRelationsName() {
        var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['parent', 'child', 'ancestor', 'descendant'];

        return Object.keys(relations || {}).map(function (key) {
          if (relations[key] && types.includes(relations[key].type)) {
            return key;
          }
          return null;
        }).filter(function (v) {
          return !!v;
        });
      },
      debounce: function debounce(func) {
        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        return (this._debounce = this._debounce || (0, _debounce3.default)(func.bind(this), wait, immediate)).call(this);
      }
    });
  }
});